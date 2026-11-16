import User from "../models/User.js";
import { z } from "zod";
import {
  updateProfileSchema,
  updatePasswordSchema,
} from "../schemas/user.schema.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import AppError from "../utils/AppError.js";
import { UserRole } from "../types/user.types.js";

type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export const updateUserProfile = async (
  userId: string,
  data: UpdateProfileInput,
) => {
  const userFound = await User.findById(userId);

  if (!userFound) {
    throw new AppError("User not found", 404);
  }

  if (data.email && data.email !== userFound.email) {
    const existingUser = await User.findOne({
      email: data.email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new AppError("Email already registered", 409);
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true },
  );

  if (!updatedUser) {
    throw new AppError("User not found", 404);
  }

  return {
    id: updatedUser._id.toString(),
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  };
};

export const updateUserPassword = async (
  userId: string,
  data: UpdatePasswordInput,
) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isPasswordValid = await comparePassword(
    data.currentPassword,
    user.password,
  );

  if (!isPasswordValid) {
    throw new AppError("Current password is incorrect", 401);
  }

  const hashedPassword = await hashPassword(data.newPassword);

  user.password = hashedPassword;

  await user.save();

  return {
    message: "Password updated successfully",
  };
};

export const getAllUsers = async () => {
  const users = await User.find().sort({ createdAt: -1 });

  return users.map((user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }));
};

export const getUserById = async (userId: string) => {
  const userFound = await User.findById(userId);

  if (!userFound) {
    throw new AppError("User not found", 404);
  }

  return {
    id: userFound._id.toString(),
    name: userFound.name,
    email: userFound.email,
    role: userFound.role,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  };
};

export const updateUserRole = async (
  userId: string,
  role: UserRole,
  adminId: string,
) => {
  if (userId === adminId) {
    throw new AppError("You cannot change your own role", 403);
  }

  const userFound = await User.findById(userId);

  if (!userFound) {
    throw new AppError("User not found", 404);
  }

  userFound.role = role;

  await userFound.save();

  return {
    id: userFound._id.toString(),
    name: userFound.name,
    email: userFound.email,
    role: userFound.role,
  };
};
