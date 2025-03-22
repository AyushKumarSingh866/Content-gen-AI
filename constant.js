import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5006; // Ensure a default port

export const MONGODB_URI = process.env.MONGODB_URI;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET; // ✅ Added this

export const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY ;

export const DB_NAME = "genai";

export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Content-gen-AI",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`, // Now it always has a valid value
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};
