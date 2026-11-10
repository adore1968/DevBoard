import { Schema, model } from "mongoose";
import type { IProject } from "../types/project.types.js";

const projectSchema = new Schema<IProject>(
  {
    name: {
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
      enum: ["active", "completed", "archived"],
      default: "active",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    startDate: {
      type: Date,
    },

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const Project = model<IProject>("Project", projectSchema);

export default Project;
