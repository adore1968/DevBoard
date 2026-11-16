import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware: RequestHandler = async (
  req,
  res,
  next,
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res
      .status(500)
      .json({ status: "error", message: "Server configuration error" });
    return;
  }

  let decoded;

  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
    return;
  }

  if (
    typeof decoded !== "object" ||
    decoded === null ||
    typeof decoded.id !== "string"
  ) {
    res
      .status(401)
      .json({ status: "error", message: "Invalid authentication token" });
    return;
  }

  try {
    const user = await User.findById(decoded.id);

    if (!user) {
      res
        .status(401)
        .json({ status: "error", message: "Invalid authentication token" });
      return;
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
