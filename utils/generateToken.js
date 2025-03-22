import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET } from "../constant.js";

// Generate Access Token (valid for 1 month on signup)
export const generateAccessToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d", // Access token valid for 1 month
  });
};

// Generate Refresh Token (valid for 7 days)
export const generateRefreshToken = (id) => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d", // Refresh token valid for 7 days
  });
};
