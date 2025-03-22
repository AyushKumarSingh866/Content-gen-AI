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

// 🔥 Fix CORS Issue: Allow both `localhost:3000` and `localhost:3002`
const allowedOrigins = ["http://localhost:3000", "http://localhost:3002"];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`✅ Allowed Origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Apply CORS Middleware
app.use(cors(corsOptions));

// ✅ Handle Preflight Requests (OPTIONS)
app.options("*", cors(corsOptions));

// Debugging Middleware for Logging Requests
app.use((req, res, next) => {
  console.log(`📥 Incoming Request: ${req.method} ${req.url}`);
  console.log("🔹 Request Body:", req.body);
  next();
});

// API Routes
app.use("/api", userRouter);

// Debug Route: To Check If API is Running
app.get("/api/status", (req, res) => {
  res.json({ status: "✅ API is running!", time: new Date().toISOString() });
});

// Swagger Documentation
const swaggerSpec = swaggerJsDoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve React Frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// Handle React Routing
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) return next(); // Ensure API calls work
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🚨 Error Stack Trace:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server only if the database connection is successful
const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => console.log(`✅ Server is running on PORT ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
