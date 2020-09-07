import createError from "http-errors";
// Fast, unopinionated, minimalist web framework for node.
import express from "express";
import path from "path";
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names
import cookieParser from "cookie-parser";
// HTTP request logger middleware for node.js
import logger from "morgan";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

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
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpException,
  req: express.Request,
  res: express.Response
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
