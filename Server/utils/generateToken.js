import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constant.js";

//generating tokens
export const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "30d",
  });
};
