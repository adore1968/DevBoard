import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createProjectSchema } from "../schemas/project.schema.js";
import { createProjectController } from "../controllers/project.controller.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createProjectSchema),
  createProjectController,
);

export default router;
