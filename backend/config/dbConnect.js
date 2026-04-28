import mongoose from "mongoose";
import dotenv from "dotenv/config";

const url = process.env.url;
export const dbConnect = async () => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Cannot connect MongoDB ", error);
  }
};
