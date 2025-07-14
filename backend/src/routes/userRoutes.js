import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updatePassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.patch("/:id", updatePassword);

router.post("/create", createUser);

router.delete("/:id", deleteUser);

export default router;