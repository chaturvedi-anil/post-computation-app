import { NextFunction, Request, Response } from "express";
import { CatchAsyncRequest } from "../../middleware/catchAsync.middleware";
import * as AuthServices from "./auth.service";

export type AuthProp = {
  username: string;
  password: string;
};

export const register = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await AuthServices.registerUser(req.body);
    res.status(201).json({
      success: true,
      data,
    });
  }
);

export const login = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await AuthServices.loginUser(req.body);
    res.status(200).json({
      success: true,
      data,
    });
  }
);

export const getMe = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const username = req.user!.username;
    const data = await AuthServices.getMe(username);
    res.status(200).json({
      success: true,
      data,
    });
  }
);
