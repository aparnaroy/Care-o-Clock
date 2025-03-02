import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // ✅ Needed for serving React frontend
import connectDB from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"; // ✅ Import this before using

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(cors()); // Enables CORS
app.use(express.json()); // Allows JSON parsing

// ✅ API Routes - These must be defined before serving frontend
app.use("/api", authRoutes); // Authentication routes
app.use("/api/user", userRoutes); // User-related routes

// ✅ Serve React Frontend (Only for non-API requests)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  console.log("🚨 Frontend request intercepted:", req.originalUrl);
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// ✅ Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
