import express from "express";
import { verifyUser, loginUser } from "../controllers/authController.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router()

router.get("/verify", rateLimiter, verifyUser);

router.post("/login", rateLimiter, loginUser);

export default router;