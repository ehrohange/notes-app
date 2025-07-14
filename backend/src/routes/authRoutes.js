import express from "express";
import { verifyUser } from "../controllers/authController.js";

const router = express.Router()

router.get("/verify", verifyUser);

export default router;