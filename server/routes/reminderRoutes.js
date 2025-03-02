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

export default router;
