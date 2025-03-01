import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

// Route: GET /api/user/:email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne(
      { email: req.params.email.toLowerCase() }, // Ensure case-insensitive search
      {
        _id: 0, // Exclude _id field from response
        "medical_profile.legal_name": 1,
        "medical_profile.dob": 1,
        "medical_profile.emergency_contact": 1,
        "medical_profile.medical_conditions": 1,
      }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
