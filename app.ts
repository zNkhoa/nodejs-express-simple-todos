import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

import errorHandler from "./helpers/error-handler";
import todosRouter from "./routes/todos";
import usersRouter from "./controllers/users.controller";
import { jwt } from "./helpers/jwt";

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
app.use(jwt());
// route handler middleware
app.use("/todos", todosRouter);
app.use("/users", usersRouter);
// handle error middleware
app.use(errorHandler);

export default app;
