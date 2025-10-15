import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./modules/index.routes";
import { ErrorMiddleware } from "./middleware/error.middleware";
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// test route
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// app routes
app.use("/api/v1/", router);

// error handler middleware
app.use(ErrorMiddleware);

export default app;
