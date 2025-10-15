import { NextFunction, Request, Response } from "express";
import { CatchAsyncRequest } from "./catchAsync.middleware";
import ErrorHandler from "../utils/error-handler";
import { TokenPayload, verifyToken } from "../utils/jwt";

export const isAuthenticated = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorHandler("Unauthorized", 401);
    }

    const decoded = verifyToken(token) as TokenPayload;

    req.user = decoded;

    next();
  }
);
