import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Project name must contain at least 2 characters")
    .max(100, "Project name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  status: z.enum(["active", "completed", "archived"]).optional(),

  startDate: z.iso.date().optional(),

  dueDate: z.iso.date().optional(),
});

export const updateProjectSchema = createProjectSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided",
  );
