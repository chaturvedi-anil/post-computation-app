import { NextFunction, Request, Response } from "express";
import * as PostService from "./post.service";
import { CatchAsyncRequest } from "../../middleware/catchAsync.middleware";

export const createPost = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user!.id;
    const { value } = req.body;

    const crerated = await PostService.createPost(authorId, value);

    res.status(201).json({
      success: true,
      data: {
        post: crerated,
      },
    });
  }
);

export const getPost = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params!.id;

    const post = await PostService.getPost(id);

    res.status(200).json({ success: true, data: { post } });
  }
);
export const getPostList = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const postList = await PostService.postList();

    res.status(200).json({
      success: true,
      data: {
        posts: postList,
      },
    });
  }
);

export const deletePost = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user!.id;
    const id = req.params!.id;
    const deleted = await PostService.deletePost(id, authorId);

    res.status(201).json({
      success: true,
      deleted,
    });
  }
);

export type CreateOperationType = {
  authorId: string;
  parentId?: string | null;
  operation: "ADD" | "SUB" | "MUL" | "DIV";
  operand: number;
};
export const createOperation = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const { parentId, operand, operation }: CreateOperationType = req.body;
    const authorId = req.user!.id;
    const postId = req.params!.id;

    const create = await PostService.createOperation({
      postId: postId,
      authorId: authorId,
      parentId: parentId,
      operation: operation,
      operand: operand,
    });
    res.status(201).json({
      success: true,
      message: "Operations Completed successfully",
      data: create,
    });
  }
);

export const getOperationsList = CatchAsyncRequest(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params!.id;

    const operations = await PostService.getOperationsList(postId);

    res.status(200).json({
      success: true,
      data: { operations: operations },
    });
  }
);
