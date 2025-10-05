import express from "express";
import userRoutes from "./user.routes.js";
import { env } from "../config/index.js";

const router = express.Router();

// Mount user routes
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
