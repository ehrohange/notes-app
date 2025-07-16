import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/all/:userId", authenticateUser, rateLimiter, getAllNotes);

router.get("/:userId/:id", authenticateUser, rateLimiter, getNoteById);

router.post("/:userId", authenticateUser, rateLimiter, createNote);

router.patch("update/:id", authenticateUser, rateLimiter, updateNote);

router.delete("delete/:id", authenticateUser, rateLimiter, deleteNote);

export default router;

// app.get("/api/notes", (req, res) => {
//     res.status(200).json({
//         message: "Welcome to the Notes API",}
//     );
// });

// app.post("/api/notes", (req, res) => {
//     res.status(201).json({
//         message: "Note created successfully.",}
//     );
// });

// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({
//         message: "Post updated successfully.",}
//     );
// });

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({
//         message: "Post deleted successfully.",}
//     );
// });