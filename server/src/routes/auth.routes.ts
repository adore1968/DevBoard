import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController,
} from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), registerController);

router.post("/login", validate(loginSchema), loginController);

router.post("/logout", authMiddleware, logoutController);

router.get("/me", authMiddleware, getCurrentUserController);

export default router;
