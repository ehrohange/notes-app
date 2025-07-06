import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const __dirname = path.resolve();

// Middlewares

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Allow requests from this origin
    })
  );
}

app.use(express.json()); // Middleware to parse JSON bodies: req.body

app.use(rateLimiter);

// Custom middleware to log request details
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next(); // Pass the request to the next middleware or route handler
// })

// Routes

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
