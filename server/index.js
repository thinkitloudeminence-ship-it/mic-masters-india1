import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import registrationRoutes from "./routes/registrationRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/registrations", registrationRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
