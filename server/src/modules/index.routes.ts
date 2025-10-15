import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validate.middleware";
import { authSchema } from "./auth/auth.schema";
import { operationSchema, postSchema } from "./post/post.schema";
import { getMe, login, register } from "./auth/auth.controller";
import {
  createPost,
  deletePost,
  getPost,
  getPostList,
  createOperation,
  getOperationsList,
} from "./post/post.controller";
const router = express.Router();

// auth routes
router.post("/register", validateRequest(authSchema), register);
router.post("/login", validateRequest(authSchema), login);
router.get("/me", isAuthenticated, getMe);

// post routes
router.post("/posts", isAuthenticated, validateRequest(postSchema), createPost);
router.get("/posts/:id", isAuthenticated, getPost);
router.delete("/posts/:id", isAuthenticated, deletePost);
router.post(
  "/posts/:id/operations",
  isAuthenticated,
  validateRequest(operationSchema),
  createOperation
);

// guest user routes
router.get("/posts", getPostList);
router.get("/posts/:id/operations", getOperationsList);

export default router;
