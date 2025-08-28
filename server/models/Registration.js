import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  email: String,
  mobile: String,
  city: String,
  category: String,
}, { timestamps: true });

export default mongoose.model("Registration", registrationSchema);
