import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    ); // Updated syntax
    console.log(
      `✅ MongoDB connected successfully !!! ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};



export default connectDB;
