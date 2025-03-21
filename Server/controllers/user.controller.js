import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

/*
@description        Register New user
@route              POST /api/signup
@access             Public
*/
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      // Generate tokens
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Set refresh token as HTTP-only cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(201).json({
        success: true,
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          accessToken,
        },
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/*
@description        Authenticate a user
@route              POST /api/login
@access             Public
*/
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    console.log(`🔍 Checking user: ${email}`);

    // Check if user exists
    const user = await User.find({ email });

    if (!user) {
      console.warn("❌ User not found:", email);
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    console.log("🔵 Entered Password:", password);
    console.log("🟢 Hashed Password in DB:", user.password);

    if (!user.password) {
      console.error("⚠️ User found but password is missing in DB:", email);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.warn("❌ Password mismatch for user:", email);
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Set refresh token as HTTP cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log(`✅ Login successful: ${email}`);

    res.json({
      success: true,
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/*
@description        Validate Token & Refresh if Expired
@route              POST /api/refresh
@access             Public
*/
export const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id);
    res.json({ accessToken: newAccessToken });

  } catch (error) {
    console.error("❌ Refresh Token Error:", error);
    return res.status(403).json({ message: "Refresh token expired" });
  }
};

/*
@description        Get user data
@route              GET /api/me
@access             Private
*/
export const getDetails = async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
      id: _id,
      name,
      email,
    });
  } catch (error) {
    console.error("❌ Get User Details Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
