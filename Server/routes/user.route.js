import express from "express";
import { getDetails, loginUser, registerUser } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middlewares.js"; 
import generateMiddleware from "../middlewares/chatGen.middleware.js"; // ✅ Import middleware
import generateCodeMiddleware from "../middlewares/codeGen.middleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/signup", registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/details:
 *   get:
 *     summary: Get user details
 *     description: Retrieve the details of the authenticated user.
 *     security:
 *       - bearerAuth: []  # Requires JWT authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *       401:
 *         description: Unauthorized, token required
 */
router.get("/details", protect, getDetails);

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Generate text using Llama 3.1
 *     description: Streams AI-generated responses from a locally running Llama 3 model via Ollama.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Tell me something interesting!"
 *     responses:
 *       200:
 *         description: Successfully generated response (streaming)
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Here’s a fun fact: Honey never spoils!"
 *       400:
 *         description: Bad request, message is required
 *       500:
 *         description: Internal server error
 */
router.post("/chat", generateMiddleware); 

/**
 * @swagger
 * /api/code:
 *   post:
 *     summary: Generate code using Deepseek Llama model
 *     description: Streams AI-generated code responses from a locally running Deepseek Llama model via Ollama.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt or description for the code to be generated.
 *                 example: "Write a Python function to calculate the factorial of a number."
 *     responses:
 *       200:
 *         description: Successfully generated code (streaming)
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: |
 *                 def factorial(n):
 *                     if n == 0:
 *                         return 1
 *                     else:
 *                         return n * factorial(n-1)
 *       400:
 *         description: Bad request, prompt is required
 *       500:
 *         description: Internal server error
 */
router.post("/code", generateCodeMiddleware);

export default router;
