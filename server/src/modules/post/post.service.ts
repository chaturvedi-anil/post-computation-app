import ErrorHandler from "../../utils/error-handler";
import { applyOperation } from "../../utils/math";
import * as PostRepo from "./post.repository";

export const createPost = async (authorId: string, value: number) => {
  const post = await PostRepo.createPost(authorId, value);

  return post;
};

export const postList = async () => {
  const postList = await PostRepo.postList();
  return postList;
};

export const getPost = async (id: string) => {
  const post = await PostRepo.findPostById(id);

  return post;
};

export const deletePost = async (id: string, authorId: string) => {
  const isPostExist = await PostRepo.findPostByIdAndAuthorId(id, authorId);
  if (!isPostExist) {
    throw new ErrorHandler("Post not found with the provided ID.", 404);
  }
  const isDeleted = await PostRepo.deletePostById(isPostExist!.id);
  return isDeleted;
};

export type CreateOperationType = {
  postId: string;
  authorId: string;
  parentId?: string | null;
  operation: "ADD" | "SUB" | "MUL" | "DIV";
  operand: number;
};
export const createOperation = async (data: CreateOperationType) => {
  const isPostExist = await PostRepo.findPostById(data.postId);
  if (!isPostExist) {
    throw new ErrorHandler("Post not found", 404);
  }

  let left;

  if (!data.parentId || data.parentId === null) {
    left = Number(isPostExist.value);
  } else {
    const isParentOp = await PostRepo.findOperationById(data.parentId);

    if (!isParentOp) {
      throw new ErrorHandler("Parent operation not found", 404);
    }

    if (isParentOp.postId !== isPostExist.id) {
      throw new ErrorHandler("Parent does not belong to same post", 404);
    }

    left = Number(isParentOp.result);
  }

  let right = Number(data.operand);

  const result = applyOperation(left, data.operation, right);

  const newOperation = await PostRepo.createOperation({
    postId: data.postId,
    authorId: data.authorId,
    parentId: data.parentId,
    operation: data.operation,
    operand: data.operand,
    result: result,
  });

  return newOperation;
};

export const getOperationsList = async (postId: string) => {
  const operations = await PostRepo.listOperationsByPostId(postId);
  return operations;
};
