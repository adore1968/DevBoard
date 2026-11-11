import User from "../models/User.js";
import { z } from "zod";
import {
  updateProfileSchema,
  updatePasswordSchema,
} from "../schemas/user.schema.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import AppError from "../utils/AppError.js";

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

  const existingUser = await User.findOne({
    email: data.email,
    _id: { $ne: userId },
  });
};
