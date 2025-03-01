import express from "express";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  console.log(`🔍 Received request for email: ${req.params.email}`);

  try {
    // Check if database connection is actually open
    if (!User.db || User.db.readyState !== 1) {
      console.log("❌ Database is not connected!");
      return res.status(500).json({ message: "Database connection error" });
    }

    // Log all users to check what is stored
    const allUsers = await User.find({});
    console.log("📢 All Users in DB:", allUsers);

    // Log all emails to check for case mismatch
    const emails = allUsers.map(user => user.email);
    console.log("📢 Emails in DB:", emails);

    // Log the query we are about to make
    const queryEmail = req.params.email.toLowerCase();
    console.log(`🔍 Querying for email: ${queryEmail}`);

    // Run case-insensitive search
    const user = await User.findOne({ email: new RegExp(`^${queryEmail}$`, "i") });

    // Log the exact response we get from the database
    console.log(`📢 MongoDB Response:`, user);

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("❌ API Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
