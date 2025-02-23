import express from "express";
import { getMe, loginUser, registerUser } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middlewares.js"; 

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
 * /api/me:
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
router.get("/me", protect, getMe);

export default router;
