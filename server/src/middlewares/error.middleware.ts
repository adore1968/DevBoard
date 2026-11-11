import type { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError.js";

const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
): void => {
  if (error instanceof AppError) {
    res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
    return;
  }

  res.status(500).json({ status: "error", message: "Internal server error" });
};

export default errorMiddleware;
