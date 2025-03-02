import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Your Mongoose User model

const router = express.Router();

// ✅ Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        // 2️⃣ Compare hashed password
        const isMatch = await bcrypt.compare(password, user.hashed_password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // 3️⃣ Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Signup Route (Stores Data in the Required Format)
router.post("/signup", async (req, res) => {
    try {
        const { fullName, birthDate, emergencyName, emergencyPhone, medicalConditions, email, password } = req.body;

        // 1️⃣ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // 2️⃣ Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3️⃣ Create new user with the exact format you requested
        const newUser = new User({
            email,
            hashed_password: hashedPassword,
            medical_profile: {
                legal_name: fullName,
                dob: birthDate,
                emergency_contact: {
                    name: emergencyName,
                    phone_number: emergencyPhone,
                },
                medical_conditions: medicalConditions,
            },
        });

        await newUser.save();

        // 4️⃣ Generate JWT token
        const token = jwt.sign({ userId: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "Signup successful", user: newUser, token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;
