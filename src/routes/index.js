import express from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import { env } from "../config/index.js";

const router = express.Router();

// Mount routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

// Health check route
router.get("/health", (req, res) => {
    res.json({
        status: "API is running",
        timestamp: new Date().toISOString(),
        environment: env.NODE_ENV || "development"
    });
});

export default router;
