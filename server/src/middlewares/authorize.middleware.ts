import type { RequestHandler } from "express";
import type { UserRole } from "../types/user.types.js";

const authorize = (...allowedRoles: UserRole[]): RequestHandler => {
  return (req, res, next): void => {
    if (!req.user) {
      res
        .status(401)
        .json({ status: "error", message: "Authentication required" });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        status: "error",
        message: "You do not have permission to access this resource",
      });
      return;
    }

    next();
  };
};

export default authorize;
