import express from "express";
import User from "../models/userModel.js"; // Ensure your user model is correct
import { authenticateUser } from "../middleware/authMiddleware.js"; // Middleware for JWT authentication

const router = express.Router();

// ✅ Route to add a new appointment to a user's reminders
router.post("/appointments", authenticateUser, async (req, res) => {
  try {
    const { title, datetime, location, notes } = req.body;

    // Ensure all required fields are present
    if (!title || !datetime || !location) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the authenticated user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new appointment object
    const newAppointment = {
      title,
      datetime: new Date(datetime).toISOString(), // Ensure proper formatting
      location,
      notes: notes || "",
    };

    // Push the new appointment to the user's reminders.appointments array
    user.reminders.appointments.push(newAppointment);

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Appointment added successfully", appointment: newAppointment });
  } catch (error) {
    console.error("❌ Error adding appointment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ Route to add a new medication to a user's reminders
router.post("/medications", authenticateUser, async (req, res) => {
  try {
    const {
      name,
      dose,
      frequency,
      filled_date,
      expiration_date,
      refills,
      amount,
      dates_taken,
    } = req.body;

    // Ensure required fields are present
    if (!name || !dose || !frequency || !filled_date || !expiration_date) {
      return res.status(400).json({ message: "Missing required medication details" });
    }

    // Find the authenticated user
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new medication object
    const newMedication = {
      name,
      dose,
      frequency: {
        unit: frequency.unit || "day", // Default to "day" if not provided
        value: frequency.value ? parseInt(frequency.value, 10) : 1, // Default to every 1 day
      },
      filled_date: filled_date || new Date().toISOString().split("T")[0], // Default to today if empty
      expiration_date: expiration_date || "2026-01-01", // Default future date if empty
      refills: refills ? parseInt(refills, 10) : 0, // Default 0 refills
      amount: amount ? parseInt(amount, 10) : 30, // Default to 30 pills if empty
      dates_taken: dates_taken ? parseInt(dates_taken, 10) : 0, // Default to 0
    };

    // Push the new medication to the user's reminders.medications array
    user.reminders.medications.push(newMedication);

    // Save the updated user document
    await user.save();

    res.status(201).json({ message: "Medication added successfully", medication: newMedication });
  } catch (error) {
    console.error("❌ Error adding medication:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
