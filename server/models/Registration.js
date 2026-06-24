<<<<<<< HEAD
const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    education: { type: String, required: true },
    educationOther: { type: String }, // optional other education
    hobbies: { type: [String] }, // multiple hobbies allowed
    category: { type: String }, // new field
    interested: { type: String, required: true },
    inquiry: { type: String },

    // Payment proof is stored on Cloudinary (Render's local disk is wiped
    // on every restart/redeploy, so local file paths are not safe long-term).
    paymentProof: { type: String }, // Cloudinary secure_url
    paymentProofPublicId: { type: String }, // Cloudinary public_id (needed to delete/replace)

    // Manual verification flow: user uploads proof -> admin reviews -> approves/rejects.
    // We are not using a payment gateway, so there is no automatic webhook;
    // an admin must confirm the screenshot before the "confirmed" email goes out.
    paymentStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },
    verifiedAt: { type: Date },
    confirmationEmailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);
=======
import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// ✅ Save registration (POST)
router.post("/", async (req, res) => {
  try {
    const { fullName, mobile, email, education, interested, inquiry } = req.body;

    const newReg = new Registration({
      fullName,
      mobile,
      email,
      education,
      interested,
      inquiry,
    });

    const saved = await newReg.save();

    res.json({
      message: "✅ Registration saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error("❌ Error saving registration:", error);
    res.status(500).json({
      message: "❌ Error saving registration",
      error: error.message,
    });
  }
});

// ✅ Get all registrations (GET) – for Admin
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    console.error("❌ Error fetching registrations:", error);
    res.status(500).json({ message: "❌ Error fetching registrations" });
  }
});

export default router;
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
