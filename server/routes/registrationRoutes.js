import express from "express";
import Registration from "../models/Registration.js";

const router = express.Router();

// POST - Save registration
router.post("/", async (req, res) => {
  try {
    const registration = new Registration(req.body);
    const saved = await registration.save();
    res.json({ message: "✅ Registration saved successfully", data: saved });
  } catch (error) {
    res.status(500).json({ message: "❌ Error saving registration", error: error.message });
  }
});

// GET - All registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching registrations", error: error.message });
  }
});

export default router;
