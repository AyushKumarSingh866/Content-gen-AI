import express from "express";
import {
  getDetails,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middlewares.js";
import { generateChat } from "../controllers/chatGen.controller.js";
import { generateCode } from "../controllers/codeGen.controller.js";
const router = express.Router();

// Debugging middleware (Logs incoming requests)
router.use((req, res, next) => {
  console.log(`📥 Received ${req.method} request on ${req.originalUrl}`);
  console.log("🔹 Request Body:", req.body);
  next();
});

// Signup Route
router.post("/signup", registerUser);

// Login Route
router.post("/login", loginUser);

// User Details (Protected Route)
router.get("/details", protect, getDetails);

// Chat Route (Streaming Response)
router.post("/chat", async (req, res) => {
  try {
    await generateChat(req, res);
  } catch (error) {
    console.error("❌ Chat API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
