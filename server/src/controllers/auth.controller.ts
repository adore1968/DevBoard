import type { RequestHandler } from "express";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

export const registerController: RequestHandler = (req, res, next): void => {
  registerUser(req.body)
    .then(({ token, ...user }) => {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: { user },
      });
    })
    .catch(next);
};

export const loginController: RequestHandler = (req, res, next): void => {
  loginUser(req.body)
    .then(({ token, ...user }) => {
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: { user },
      });
    })
    .catch(next);
};

export const logoutController: RequestHandler = (_req, res): void => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.status(200).json({ status: "success", message: "Logout successful" });
};

export const getCurrentUserController: RequestHandler = (
  req,
  res,
  next,
): void => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  getCurrentUser(req.user.id)
    .then((user) => {
      res.status(200).json({ status: "success", data: { user } });
    })
    .catch(next);
};
