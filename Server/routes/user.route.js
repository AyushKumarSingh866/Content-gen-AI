import express from "express";
import bcrypt from "bcryptjs"; // Ensure correct password comparison
import {
  getDetails,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middlewares.js";
import generateChat from "../controllers/chatGen.controller.js";
import generateCode from "../controllers/codeGen.controller.js";
import User from "../models/user.model.js"; // Import User model

const router = express.Router();

// Debugging middleware (Logs incoming requests)
router.use((req, res, next) => {
  console.log(`📥 Received ${req.method} request on ${req.originalUrl}`);
  console.log("🔹 Request Body:", req.body);
  next();
});

// Signup Route
router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Ensure password is hashed before saving
    req.body.password = await bcrypt.hash(password, 10);
    await registerUser(req, res);
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("🔍 Checking user:", email);

    // Fetch user from the database
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ Login successful:", user.email);
    res.json({ user });

  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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

// Code Route (Streaming Response)
router.post("/code", async (req, res) => {
  try {
    await generateCode(req, res);
  } catch (error) {
    console.error("❌ Code API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
