import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";
import {
  createProjectController,
  deleteProjectController,
  getProjectByIdController,
  getUserProjectsController,
  updateProjectController,
} from "../controllers/project.controller.js";
import validate from "../middlewares/validate.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createProjectSchema),
  createProjectController,
);

router.get("/", authMiddleware, getUserProjectsController);

router.get("/:projectId", authMiddleware, getProjectByIdController);

router.patch(
  "/:projectId",
  authMiddleware,
  validate(updateProjectSchema),
  updateProjectController,
);

router.delete("/:projectId", authMiddleware, deleteProjectController);

export default router;
