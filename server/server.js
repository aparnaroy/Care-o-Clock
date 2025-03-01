import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ FIX: Enable CORS for Railway frontend
app.use(
  cors({
    origin: ["https://care-o-clock.up.railway.app", "http://localhost:5173"], // ✅ Allow both production & local frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ API routes
app.use("/api/user", userRoutes);

// ✅ Serve React frontend (Only for non-API requests)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../dist"))); 

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
