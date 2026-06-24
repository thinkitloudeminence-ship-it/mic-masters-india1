// Run this once (locally or via `node seedAdmin.js`) to create your admin
// login. It reads ADMIN_USERNAME and ADMIN_PASSWORD from your .env file,
// hashes the password with bcrypt, and saves it to MongoDB.
//
// Usage:
//   1. Set ADMIN_USERNAME and ADMIN_PASSWORD in server/.env
//   2. Run: node seedAdmin.js
//   3. Delete/rotate ADMIN_PASSWORD from .env after running if you want
//      (it's only needed at seed time, not at runtime).

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Admin = require("./models/Admin");

dotenv.config();

async function seedAdmin() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error("❌ ADMIN_USERNAME and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("❌ ADMIN_PASSWORD should be at least 8 characters long");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ MongoDB connected");

  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await Admin.findOne({ username });
  if (existing) {
    existing.passwordHash = passwordHash;
    await existing.save();
    console.log(`✅ Admin "${username}" password updated.`);
  } else {
    await Admin.create({ username, passwordHash });
    console.log(`✅ Admin "${username}" created.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("❌ Error seeding admin:", err);
  process.exit(1);
});
