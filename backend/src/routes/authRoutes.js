import express from "express";
import { verifyUser, loginUser } from "../controllers/authController.js";

const router = express.Router()

router.get("/verify", verifyUser);

router.post("/login", loginUser);

export default router;