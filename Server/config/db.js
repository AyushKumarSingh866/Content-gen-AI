import mongoose from "mongoose";
import { DB_NAME, MONGODB_URI } from "../constant.js";

const connectDb = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const connectionInstance = await mongoose.connect(
      `${MONGODB_URI}/${DB_NAME}`
    );

    console.log(
      ` Database connected successfully !!! ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(` Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
