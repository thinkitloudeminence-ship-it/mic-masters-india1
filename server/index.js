<<<<<<< HEAD
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");
=======
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import registrationRoutes from "./routes/registrationRoutes.js";
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5

dotenv.config();
const app = express();

<<<<<<< HEAD
// ---------------------------------------------------------------------------
// Security middleware
// ---------------------------------------------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        connectSrc: ["'self'", "https://www.google-analytics.com"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
    noSniff: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xssFilter: true,
    frameguard: { action: "deny" },
  })
);

// Trust Render's reverse proxy so rate-limiting / IPs work correctly
app.set("trust proxy", 1);

// General API rate limit
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api", generalLimiter);

// CORS - only allow your actual frontend domain(s)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Remove X-Powered-By header to hide Express fingerprint
app.disable("x-powered-by");

app.use(morgan("combined"));
app.use(express.json({ limit: "10kb" }));  // limit JSON body size
app.use(cookieParser());

// Serve local uploads (fallback for any legacy files)
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res) => {
    res.set("X-Content-Type-Options", "nosniff");
  }
}));

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
const registrationRoutes = require("./routes/registrationRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");

app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminAuthRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err.message);
  res.status(500).json({ message: "Internal server error" });
});

// ---------------------------------------------------------------------------
// MongoDB connect
// ---------------------------------------------------------------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
=======
// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/registrations", registrationRoutes);

// DB + Server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
>>>>>>> 79ba03530b485e4de951769054c6cd23c386abf5
