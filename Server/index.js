import express from "express";
import { options, PORT } from "./constant.js";
import connectDb from "./config/db.js";
import userRouter from "./routes/user.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration (Fix Streaming Issues)
app.use(
  cors({
    origin: "*", // Update based on frontend port
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use("/api", userRouter);

// Swagger Documentation
const swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve React Frontend AFTER API Routes
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next(); // Fix API calls interference
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const port = PORT || 5006;
app.listen(port, async () => {
  try {
    await connectDb();
    console.log(` Server is running on PORT ${port}`);
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
});
