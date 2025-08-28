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
