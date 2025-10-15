import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "internal server error";
  let details;

  // prisma error
  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Invalid Input";
    statusCode = 400;
  }

  // JWT error
  else if (err.name === "JsonWebTokenError") {
    message = "Invalid token, Please login again.";
    statusCode = 401;
  } else if (err.name == "TokenExpiredError") {
    message = "Your token has expired. Please login again.";
    statusCode = 401;
  }

  // Zod error
  else if (message === "Validation failed" && err.details) {
    details =
      typeof err.details === "string" ? JSON.parse(err.details) : err.details;
  }

  res.status(statusCode).json({
    success: false,
    message,
    details,
  });
};
