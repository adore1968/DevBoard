import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Task title must contain at least 2 characters")
    .max(100, "Task title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  status: z.enum(["pending", "in_progress", "completed"]).optional(),

  priority: z.enum(["low", "medium", "high"]).optional(),

  dueDate: z.iso.date().optional(),
});

export const updateTaskSchema = createTaskSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided",
  );
