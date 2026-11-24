import { z } from "zod";
import Project from "../models/Project.js";
import { createProjectSchema } from "../schemas/project.schema.js";

type CreateProjectType = z.infer<typeof createProjectSchema>;

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
