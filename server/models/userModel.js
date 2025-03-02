import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  medical_profile: {
    legal_name: { type: String, required: true },
    dob: { type: String, required: true },
    emergency_contact: {
      name: { type: String, required: true },
      phone_number: { type: String, required: true }
    },
    medical_conditions: { type: [String], default: [] }
  }
});

export default mongoose.model("User", userSchema);
