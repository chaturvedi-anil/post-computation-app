import { prismaClient } from "../../config/db";

export const createPost = (authorId: string, value: number) => {
  return prismaClient.post.create({
    data: {
      authorId: authorId,
      value: value,
    },
  });
};

export const postList = () => {
  return prismaClient.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { operations: true, author: { select: { username: true } } },
  });
};

export const findPostById = (id: string) => {
  return prismaClient.post.findUnique({
    where: { id },
    include: {
      author: { select: { id: true, username: true } },
      operations: {
        where: { parentId: null },
        include: {
          author: { select: { id: true, username: true } },
        },
      },
    },
  });
};

export const findPostByIdAndAuthorId = (id: string, authorId: string) => {
  return prismaClient.post.findUnique({
    where: { id: id, authorId: authorId },
  });
};

export const deletePostById = (id: string) => {
  return prismaClient.post.delete({ where: { id: id } });
};

export const findOperationById = (id: string) => {
  return prismaClient.operation.findUnique({ where: { id } });
};

export const listOperationsByPostId = (postId: string) => {
  return prismaClient.operation.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });
};

export const createOperation = (data: {
  postId: string;
  authorId: string;
  parentId?: string | null;
  operation: "ADD" | "SUB" | "MUL" | "DIV";
  operand: number;
  result: number;
}) => {
  return prismaClient.operation.create({
    data: {
      postId: data.postId,
      authorId: data.authorId,
      parentId: data.parentId,
      operation: data.operation,
      operand: data.operand,
      result: data.result,
    },
  });
};
