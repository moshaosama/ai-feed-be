import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDb = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL || "").then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.log("❌ MongoDB connection error:", err));
    }
    catch(err) {
        console.log("❌ MongoDB connection error:", err);
    }
}
