import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  medical_profile: {
    dob: String,
    provider: String,
    emergency_contact: String,
    medical_conditions: [String],
  }
});

export default mongoose.model("User", userSchema);
