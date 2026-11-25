import type { RequestHandler } from "express";
import {
  createProject,
  deleteProject,
  getProjectById,
  getUserProjects,
  updateProject,
} from "../services/project.service.js";

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

export const getUserProjectsController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  getUserProjects(req.user.id)
    .then((projects) => {
      res.status(200).json({ status: "success", data: { projects } });
    })
    .catch(next);
};

export const getProjectByIdController: RequestHandler = (req, res, next) => {
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

  getProjectById(projectId, req.user.id)
    .then((project) => {
      res.status(200).json({ status: "success", data: { project } });
    })
    .catch(next);
};

export const updateProjectController: RequestHandler = (req, res, next) => {
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

  updateProject(projectId, req.user.id, req.body)
    .then((project) => {
      res.status(200).json({ status: "success", data: { project } });
    })
    .catch(next);
};

export const deleteProjectController: RequestHandler = (req, res, next) => {
  if (!req.user) {
    res
      .status(401)
      .json({ status: "error", message: "Authentication required" });
    return;
  }

  const projectId = req.params.projectId;

  if (typeof projectId !== "string") {
    res.status(400).json({ status: "error", message: "Invalid Project ID" });
    return;
  }

  deleteProject(projectId, req.user.id)
    .then((message) => {
      res.status(200).json({ status: "success", data: { message } });
    })
    .catch(next);
};
