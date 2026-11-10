import type { RequestHandler } from "express";
import type { z } from "zod";

const validate = (schema: z.ZodType): RequestHandler => {
  return (req, res, next): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: result.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });

      return;
    }

    req.body = result.data;

    next();
  };
};

export default validate;
