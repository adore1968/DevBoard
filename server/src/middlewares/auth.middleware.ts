import type { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

const authMiddleware: RequestHandler = (req, res, next): void => {
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

  try {
    const decoded = verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      typeof decoded.id !== "string" ||
      (decoded.role !== "user" && decoded.role !== "admin")
    ) {
      res
        .status(401)
        .json({ status: "error", message: "Invalid authentication token" });
      return;
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ status: "error", message: "Invalid or expired token" });
  }
};

export default authMiddleware;
