import type { RequestHandler } from "express";
import { createTask } from "../services/task.service.js";

export const createTaskController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  const projectId = req.params.projectId;

  if (typeof projectId !== "string") {
    res.status(400).json({ status: "error", message: "Invalid project ID" });
    return;
  }

  createTask(projectId, req.user.id, req.body)
    .then((task) => {
      res.status(201).json({ status: "success", data: { task } });
    })
    .catch(next);
};
