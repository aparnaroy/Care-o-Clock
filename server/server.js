import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // ✅ Ensure JSON request/response handling

// ✅ Define API Routes BEFORE serving frontend
app.use("/api/user", userRoutes);

// ✅ Serve React frontend (Only for non-API requests)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../dist"))); 

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
