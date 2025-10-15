import { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";
import ErrorHandler from "../utils/error-handler";

export const validateRequest =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      return next();
    }

    if (result.error instanceof ZodError) {
      const errorMessage = result.error.issues.map((err) => ({
        path: err.path.join(" "),
        message: err.message,
      }));

      const stringMessage = JSON.stringify(errorMessage);

      return next(new ErrorHandler("Validation failed", 400, stringMessage));
    }

    return next(new ErrorHandler("Invalid request payload", 400));
  };
