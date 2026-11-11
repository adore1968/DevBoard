import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import type { UserRole } from "../types/user.types.js";

interface TokenPayload {
  id: string;
  role: UserRole;
}

const generateToken = (payload: TokenPayload) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1d") as NonNullable<
    SignOptions["expiresIn"]
  >;

  return jwt.sign(payload, secret, { expiresIn });
};

export default generateToken;
