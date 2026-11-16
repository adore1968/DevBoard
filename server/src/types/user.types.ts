import type { IBaseDocument } from "./common.types.js";

export type UserRole = "user" | "admin";

export interface IUser extends IBaseDocument {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
