import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Log every incoming request
app.use((req, res, next) => {
  console.log(`🔍 Incoming Request: ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(express.json());

// ✅ API routes should be above React frontend serving
app.use("/api/user", userRoutes);

// ✅ Serve React frontend (only for non-API requests)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  console.log("🚨 Frontend request intercepted:", req.originalUrl);
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
