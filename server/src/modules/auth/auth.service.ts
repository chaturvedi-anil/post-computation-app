import ErrorHandler from "../../utils/error-handler";
import { comparePassword, hashPassword } from "../../utils/hash";
import { signToken } from "../../utils/jwt";
import { AuthProp } from "./auth.controller";
import * as AuthRepo from "./auth.repository";

export const registerUser = async (reqBody: AuthProp) => {
  const { username, password } = reqBody;
  const isUserExisting = await AuthRepo.findUserByUserName(username);

  if (isUserExisting) {
    throw new ErrorHandler(
      `User with ${username} username already exists`,
      400
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await AuthRepo.createUser({
    ...reqBody,
    password: hashedPassword,
  });

  const token = signToken({ id: user.id, username: user.username });
  return { token };
};

export const loginUser = async (reqBody: AuthProp) => {
  const { username, password } = reqBody;
  const isUserExist = await AuthRepo.findUserByUsernameWithPassword(username);

  if (!isUserExist) {
    throw new ErrorHandler(`Invalid username or password`, 401);
  }

  const isPasswordCorrect = await comparePassword(
    password,
    isUserExist.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new ErrorHandler(`Invalid username or password`, 401);
  }

  const token = signToken({
    id: isUserExist.id,
    username: isUserExist.username,
  });
  return { token };
};

export const getMe = async (username: string) => {
  const user = await AuthRepo.findUserByUserName(username);
  return user;
};
