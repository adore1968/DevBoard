import User from "../models/User.js";
import type { z } from "zod";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import AppError from "../utils/AppError.js";
import generateToken from "../utils/jwt.js";

type RegisterInput = z.infer<typeof registerSchema>;

export const registerUser = async (data: RegisterInput) => {
  const { name, email, password } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({ name, email, password: hashedPassword });

  const token = generateToken({ id: user._id.toString(), role: user.role });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

type LoginInput = z.infer<typeof loginSchema>;

export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken({ id: user._id.toString(), role: user.role });

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
  };
};
