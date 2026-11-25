import { z } from "zod";
import Project from "../models/Project.js";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../schemas/project.schema.js";
import AppError from "../utils/AppError.js";
import Task from "../models/Task.js";

type CreateProjectType = z.infer<typeof createProjectSchema>;
type UpdateProjectType = z.infer<typeof updateProjectSchema>;

export const createProject = async (
  userId: string,
  data: CreateProjectType,
) => {
  const project = await Project.create({
    name: data.name,
    description: data.description ?? "",
    status: data.status ?? "active",
    owner: userId,
    ...(data.startDate ? { startDate: new Date(data.startDate) } : {}),
    ...(data.dueDate ? { dueDate: new Date(data.dueDate) } : {}),
  });

  return {
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    owner: project.owner.toString(),
    startDate: project.startDate,
    dueDate: project.dueDate,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

export const getUserProjects = async (userId: string) => {
  const projects = await Project.find({ owner: userId }).sort({
    createdAt: -1,
  });

  return projects.map((project) => ({
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    owner: project.owner.toString(),
    startDate: project.startDate,
    dueDate: project.dueDate,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  }));
};

export const getProjectById = async (projectId: string, userId: string) => {
  const project = await Project.findOne({
    _id: projectId,
    owner: userId,
  });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  return {
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    owner: project.owner.toString(),
    startDate: project.startDate,
    dueDate: project.dueDate,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

export const updateProject = async (
  projectId: string,
  userId: string,
  data: UpdateProjectType,
) => {
  const project = await Project.findOne({ _id: projectId, owner: userId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  if (data.name !== undefined) {
    project.name = data.name;
  }

  if (data.description !== undefined) {
    project.description = data.description;
  }

  if (data.status !== undefined) {
    project.status = data.status;
  }

  if (data.startDate !== undefined) {
    project.startDate = new Date(data.startDate);
  }

  if (data.dueDate !== undefined) {
    project.dueDate = new Date(data.dueDate);
  }

  await project.save();

  return {
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    owner: project.owner.toString(),
    startDate: project.startDate,
    dueDate: project.dueDate,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
  };
};

export const deleteProject = async (projectId: string, userId: string) => {
  const project = await Project.findOne({ _id: projectId, owner: userId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  await Task.deleteMany({ project: projectId });

  await project.deleteOne();

  return {
    message: "Project deleted successfully",
  };
};
