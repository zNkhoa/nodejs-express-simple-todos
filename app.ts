import express, { NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import errorHandler from "./helpers/error-handler";
import todoRouter from "./routes/todos";
import userRouter from "./controllers/users.controller";
import { jwt } from "./helpers/jwt";
import { HttpError } from "http-errors";
import { AppError } from "./helpers/errors";

export interface HttpException {
  status: number;
  message: string;
}

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// express middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// enable cors for all origins
app.use(cors());
// use JWT auth to secure the api
app.use([
  jwt(),
  function (err, req, res, next) {
    if (err) {
      const err = new AppError(401, 401, "Invalid token");
      next({ ...err });
    }
  },
]);
// route handler middleware
app.use("/todos", todoRouter);
app.use("/api/v1/users", userRouter);

// handle error middleware
app.use(errorHandler);

// handle 404 error
app.use(function (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  res.status(404).json({ code: 404, message: "Not Found" });
});

export default app;
