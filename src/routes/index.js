import express from "express";
import userRoutes from "./user.routes.js";

const router = express.Router();

// Mount user routes
router.use("/users", userRoutes);

// Health check route
router.get("/health", (req, res) => {
    res.json({
        status: "API is running",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development"
    });
});

export default router;
