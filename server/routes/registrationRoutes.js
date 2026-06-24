const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const cloudinary = require("../config/cloudinary");
const Registration = require("../models/Registration");
const requireAdminAuth = require("../middleware/requireAdminAuth");
const { sendRegistrationConfirmedEmail } = require("../utils/sendEmail");

const router = express.Router();

// ---------------------------------------------------------------------------
// Cloudinary storage for payment screenshots. Render's local disk does not
// persist across restarts/deploys, so screenshots must live on Cloudinary
// (same pattern as your other projects), not multer.diskStorage.
// ---------------------------------------------------------------------------
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mic-masters-india/payment-proofs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1600, crop: "limit" }], // cap size, no need for full-res
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, PNG, or WEBP images are allowed"));
    }
  },
});

// Limit how often the public registration endpoint can be hit per IP,
// so the form can't be spammed/flooded with fake entries.
const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 submissions per IP per window
  message: { message: "Too many submissions. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const registrationValidationRules = [
  body("fullName").trim().notEmpty().withMessage("Full name is required")
    .matches(/^[A-Za-z\s.]+$/).withMessage("Full name should contain only letters"),
  body("mobile").trim().matches(/^[0-9]{10}$/).withMessage("Mobile number must be 10 digits"),
  body("email").trim().isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("education").trim().notEmpty().withMessage("Education is required"),
  body("interested").trim().notEmpty().withMessage("Interested field is required"),
];

// ✅ POST /api/registrations — public, creates registration + uploads proof to Cloudinary
router.post(
  "/",
  registerLimiter,
  upload.single("paymentProof"),
  registrationValidationRules,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg, errors: errors.array() });
      }

      const {
        fullName,
        mobile,
        email,
        education,
        educationOther,
        hobbies,
        category,
        interested,
        inquiry,
      } = req.body;

      const newReg = new Registration({
        fullName,
        mobile,
        email,
        education,
        educationOther,
        hobbies: Array.isArray(hobbies) ? hobbies : hobbies ? [hobbies] : [],
        category,
        interested,
        inquiry,
        paymentProof: req.file ? req.file.path : null, // Cloudinary secure_url
        paymentProofPublicId: req.file ? req.file.filename : null, // Cloudinary public_id
        paymentStatus: "pending",
      });

      const saved = await newReg.save();
      return res.status(201).json({
        message: "Registration submitted. Your payment is pending verification.",
        data: saved,
      });
    } catch (error) {
      console.error("❌ Error saving registration:", error);
      return res.status(500).json({ message: "Error saving registration" });
    }
  }
);

// ✅ GET /api/registrations — ADMIN ONLY (was public before, now protected)
router.get("/", requireAdminAuth, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error("❌ Error fetching registrations:", error);
    res.status(500).json({ message: "Error fetching registrations" });
  }
});

// ✅ PATCH /api/registrations/:id/verify — ADMIN ONLY
// Approves payment proof, marks as verified, sends confirmation email.
router.patch("/:id/verify", requireAdminAuth, async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    reg.paymentStatus = "verified";
    reg.verifiedAt = new Date();
    await reg.save();

    // Send confirmation email (best-effort - don't fail the request if email fails)
    try {
      await sendRegistrationConfirmedEmail({ to: reg.email, fullName: reg.fullName });
      reg.confirmationEmailSent = true;
      await reg.save();
    } catch (emailErr) {
      console.error("⚠️ Verified but email failed to send:", emailErr);
    }

    return res.json({ message: "Registration verified", data: reg });
  } catch (error) {
    console.error("❌ Error verifying registration:", error);
    return res.status(500).json({ message: "Error verifying registration" });
  }
});

// ✅ PATCH /api/registrations/:id/reject — ADMIN ONLY
router.patch("/:id/reject", requireAdminAuth, async (req, res) => {
  try {
    const reg = await Registration.findById(req.params.id);
    if (!reg) {
      return res.status(404).json({ message: "Registration not found" });
    }

    reg.paymentStatus = "rejected";
    await reg.save();

    return res.json({ message: "Registration rejected", data: reg });
  } catch (error) {
    console.error("❌ Error rejecting registration:", error);
    return res.status(500).json({ message: "Error rejecting registration" });
  }
});

module.exports = router;
