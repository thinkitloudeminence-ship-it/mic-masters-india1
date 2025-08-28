// server/routes/registrationRoutes.js
import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// ✅ POST - Save registration
router.post("/", async (req, res) => {
  try {
    const newReg = new Registration(req.body);
    const saved = await newReg.save();

    res.status(201).json({
      message: "✅ Registration saved successfully",
      data: saved,
    });
  } catch (err) {
    console.error("❌ Error saving registration:", err);
    res.status(500).json({
      message: "❌ Error saving registration",
      error: err.message,
    });
  }
});

// ✅ GET - Fetch all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (err) {
    console.error("❌ Error fetching registrations:", err);
    res.status(500).json({
      message: "❌ Error fetching registrations",
      error: err.message,
    });
  }
});

export default router;
