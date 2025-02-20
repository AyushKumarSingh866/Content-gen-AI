import { Router } from "express";
import { handleUserSignup } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", handleUserSignup);

export default router;
