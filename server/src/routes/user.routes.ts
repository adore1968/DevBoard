import { Router } from "express";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  updateProfileController,
  updatePasswordController,
  updateUserRoleController,
  getAllUsersController,
  getUserByIdController,
} from "../controllers/user.controller.js";
import {
  updateProfileSchema,
  updatePasswordSchema,
  updateUserRoleSchema,
} from "../schemas/user.schema.js";
import authorize from "../middlewares/authorize.middleware.js";

const router = Router();

router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  updateProfileController,
);

router.patch(
  "/me/password",
  authMiddleware,
  validate(updatePasswordSchema),
  updatePasswordController,
);

router.patch(
  "/:userId/role",
  authMiddleware,
  authorize("admin"),
  validate(updateUserRoleSchema),
  updateUserRoleController,
);

router.get("/", authMiddleware, authorize("admin"), getAllUsersController);

router.get(
  "/:userId",
  authMiddleware,
  authorize("admin"),
  getUserByIdController,
);

export default router;
