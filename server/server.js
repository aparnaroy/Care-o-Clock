import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();  // Load .env variables (for local testing)
connectDB();      // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
