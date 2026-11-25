import { z } from "zod";
import Task from "../models/Task.js";
import Project from "../models/Project.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import AppError from "../utils/AppError.js";

type CreateTaskType = z.infer<typeof createTaskSchema>;

export const createTask = async (
  projectId: string,
  userId: string,
  data: CreateTaskType,
) => {
  const project = await Project.findOne({ _id: projectId, owner: userId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }

  const task = await Task.create({
    title: data.title,
    description: data.description ?? "",
    status: data.status ?? "pending",
    priority: data.priority ?? "medium",
    project: projectId,
    ...(data.dueDate ? { dueDate: new Date(data.dueDate) } : {}),
  });

  return {
    id: task._id.toString(),
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    project: task.project.toString(),
    dueDate: task.dueDate,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt,
  };
};

export const getProjectTasks = async (projectId: string, userId: string) => {
  const project = await Project.findOne({ _id: projectId, owner: userId });

  if (!project) {
    throw new AppError("Project not found", 404);
  }
};
