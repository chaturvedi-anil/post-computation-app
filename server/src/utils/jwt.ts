import jwt from "jsonwebtoken";
import ErrorHandler from "./error-handler";

const JWT_SECRET = "JWT_SECRET";

export type TokenPayload = { id: string; username: string };

export const signToken = (payload: TokenPayload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  } catch (error) {
    throw new ErrorHandler("Failed to sign JWT token", 500);
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new ErrorHandler("Invalid or expired token", 401);
  }
};
