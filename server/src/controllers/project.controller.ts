import type { RequestHandler } from "express";
import { createProject } from "../services/project.service.js";

export const createProjectController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  createProject(req.user.id, req.body)
    .then((project) =>
      res.status(201).json({ status: "success", data: { project } }),
    )
    .catch(next);
};
