const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const Admin = require("../models/Admin");
const requireAdminAuth = require("../middleware/requireAdminAuth");

const router = express.Router();

// Strict rate limit on login to slow down brute-force attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 8, // 8 attempts per IP per window
  message: { message: "Too many login attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd, // requires HTTPS in production (Render gives this by default)
  sameSite: isProd ? "none" : "lax",
  maxAge: 8 * 60 * 60 * 1000, // 8 hours
};

// ✅ POST /api/admin/login
router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      // Same generic message whether username or password is wrong -
      // don't reveal which one was incorrect.
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.cookie("admin_token", token, cookieOptions);
    return res.json({ message: "Login successful", username: admin.username });
  } catch (err) {
    console.error("❌ Admin login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// ✅ POST /api/admin/logout
router.post("/logout", (req, res) => {
  res.clearCookie("admin_token", cookieOptions);
  return res.json({ message: "Logged out" });
});

// ✅ GET /api/admin/session - lets frontend check if still logged in (e.g. after refresh)
router.get("/session", requireAdminAuth, (req, res) => {
  return res.json({ username: req.admin.username });
});

module.exports = router;
