import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:AcvClPuiOxlAUbxBvWkjYhAmlGqnnTJd@yamanote.proxy.rlwy.net:45608";

// ✅ Ensure database name is explicitly set
const DB_NAME = "db";  // 👈 Your correct database name

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME, // ✅ Explicitly set the database
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`✅ MongoDB Connected to ${DB_NAME}!`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
