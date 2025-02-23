import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;

export const MONGODB_URI = process.env.MONGODB_URI;

export const JWT_SECRET=  process.env.JWT_SECRET;

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
        url: `http://localhost:${PORT}/`,
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
