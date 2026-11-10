import { Schema, model } from "mongoose";
import type { ITask } from "../types/task.types.js";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
