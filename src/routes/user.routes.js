import express from "express";
import { authController, userController } from "../controllers/index.js";
import { auth, validateBody } from "../middlewares/index.js";
import { registerSchema, loginSchema, refreshTokenSchema, updateProfileSchema } from "../validations/index.js";

const router = express.Router();

// Auth routes with validation
router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);
router.post("/refresh-token", validateBody(refreshTokenSchema), authController.refreshToken);
router.post("/logout", auth, authController.logout);

// User profile routes with validation
router.get("/profile", auth, userController.getProfile);
router.put("/profile", auth, validateBody(updateProfileSchema), userController.updateProfile);

export default router;
