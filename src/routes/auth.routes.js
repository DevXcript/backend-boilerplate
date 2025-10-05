import express from "express";
import { authController } from "../controllers/index.js";
import { auth, validateBody } from "../middlewares/index.js";
import { registerSchema, loginSchema, refreshTokenSchema } from "../validations/index.js";

const router = express.Router();

router.post("/register", validateBody(registerSchema), authController.register);
router.post("/login", validateBody(loginSchema), authController.login);
router.post("/refresh-token", validateBody(refreshTokenSchema), authController.refreshToken);
router.post("/logout", auth, authController.logout);

export default router;


