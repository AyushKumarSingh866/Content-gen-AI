import express from "express";
import {
  getDetails,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middlewares.js";
import generateChat from "../controllers/chatGen.controller.js";
import generateCode from "../controllers/codeGen.controller.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/details", protect, getDetails);

// Chat Route (Streaming Response)
router.post("/chat", async (req, res) => {
  try {
    await generateChat(req, res);
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Code Route (Streaming Response)
router.post("/code", async (req, res) => {
  try {
    await generateCode(req, res);
  } catch (error) {
    console.error("Code API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
