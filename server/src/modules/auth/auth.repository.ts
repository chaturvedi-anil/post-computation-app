import { prismaClient } from "../../config/db";
import { AuthProp } from "./auth.controller";

export const findUserByUserName = (username: string) => {
  return prismaClient.user.findUnique({
    where: { username },
    select: { id: true, username: true, createdAt: true },
  });
};

export const findUserByUsernameWithPassword = (username: string) => {
  return prismaClient.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      passwordHash: true,
    },
  });
};

export const createUser = async (data: AuthProp) => {
  return prismaClient.user.create({
    data: {
      username: data.username,
      passwordHash: data.password,
    },
    select: {
      id: true,
      username: true,
    },
  });
};
