import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { createTaskController } from "../controllers/task.controller.js";

const router = Router();

router.post(
  "/project/:projectId",
  authMiddleware,
  validate(createTaskSchema),
  createTaskController,
);

export default router;
