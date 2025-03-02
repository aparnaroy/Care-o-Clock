import mongoose from "mongoose";

// Schema for Medications
const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dose: { type: String, required: true },
  frequency: {
    unit: { type: String, required: true }, // e.g., "hours", "days"
    value: { type: Number, required: true }, // e.g., 12, 24
  },
  filled_date: { type: Date, required: true },
  expiration_date: { type: Date, required: true },
  refills: { type: Number, default: 0 },
  amount: { type: Number, required: true },
  dates_taken: { type: Number, default: 0 },
});

// Schema for Appointments
const appointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  datetime: { type: Date, required: true },
  location: { type: String, required: true },
  notes: { type: String, default: "" },
});

// Schema for Emergency Contact
const emergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true },
});

// Schema for Medical Profile
const medicalProfileSchema = new mongoose.Schema({
  legal_name: { type: String, required: true },
  dob: { type: String, required: true },
  emergency_contact: { type: emergencyContactSchema, required: true },
  medical_conditions: { type: [String], default: [] },
});

// Schema for Reminders
const remindersSchema = new mongoose.Schema({
  medications: { type: [medicationSchema], default: [] },
  appointments: { type: [appointmentSchema], default: [] },
});

// Main User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  hashed_password: { type: String, required: true },
  medical_profile: { type: medicalProfileSchema, required: true },
  reminders: { type: remindersSchema, default: {} },
});

export default mongoose.model("User", userSchema);
