import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ FIX: Allow CORS for both local & deployed frontend
app.use(
  cors({
    origin: ["https://care-o-clock.up.railway.app", "http://localhost:5173", "http://localhost:5000"], // 👈 Update with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/auth headers if needed
  })
);

app.use(express.json());

// ✅ API routes should come before serving the frontend
app.use("/api/user", userRoutes);

// ✅ Serve React frontend (Only for non-API requests)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  if (!req.originalUrl.startsWith("/api/")) {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
  } else {
    res.status(404).json({ message: "API route not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
