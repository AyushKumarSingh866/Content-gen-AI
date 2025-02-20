import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;

export const MONGODB_URI = process.env.MONGODB_URI;

export const DB_NAME = "genai";
