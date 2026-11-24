import type { RequestHandler } from "express";
import {
  updateUserProfile,
  updateUserPassword,
  updateUserRole,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../services/user.service.js";

export const updateProfileController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  updateUserProfile(req.user.id, req.body)
    .then((user) => {
      res.status(200).json({ status: "success", data: { user } });
    })
    .catch(next);
};

export const updatePasswordController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  updateUserPassword(req.user.id, req.body)
    .then((result) => {
      res.status(200).json({ status: "success", data: result });
    })
    .catch(next);
};

export const updateUserRoleController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  const userId = req.params.userId;

  if (typeof userId !== "string") {
    res.status(400).json({ status: "error", message: "Invalid user ID" });
    return;
  }

  const { role } = req.body;

  const adminId = req.user.id;

  updateUserRole(userId, role, adminId)
    .then((user) => {
      res.status(200).json({ status: "success", data: { user } });
    })
    .catch(next);
};

export const getAllUsersController: RequestHandler = (req, res, next) => {
  getAllUsers()
    .then((users) => {
      res.status(200).json({ status: "success", data: { users } });
    })
    .catch(next);
};

export const getUserByIdController: RequestHandler = (req, res, next) => {
  const userId = req.params.userId;

  if (typeof userId !== "string") {
    res.status(400).json({ status: "error", message: "Invalid user ID" });
    return;
  }

  getUserById(userId)
    .then((user) => {
      res.status(200).json({ status: "success", data: { user } });
    })
    .catch(next);
};

export const deleteUserController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  const userId = req.params.userId;

  if (typeof userId !== "string") {
    res.status(400).json({ status: "error", message: "Invalid user ID" });
    return;
  }

  deleteUser(userId, req.user.id)
    .then((result) => res.status(200).json({ status: "success", data: result }))
    .catch(next);
};
