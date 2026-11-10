import type { Types } from "mongoose";
import type { IBaseDocument } from "./common.types";

export type ProjectStatus = "active" | "completed" | "archived";

export interface IProject extends IBaseDocument {
  name: string;
  description: string;
  status: ProjectStatus;
  owner: Types.ObjectId;
  startDate?: Date;
  dueDate?: Date;
}
