import type { Types } from "mongoose";
import type { IBaseDocument } from "./common.types";

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface ITask extends IBaseDocument {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  project: Types.ObjectId;
  dueDate?: Date;
}
