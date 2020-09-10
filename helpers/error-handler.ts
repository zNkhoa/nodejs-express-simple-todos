import express, { NextFunction } from "express";

export type ErrorStatus = "fail" | "error";

export interface HttpException extends Error {
  httpStatus: number;
  status: ErrorStatus;
  code: number;
  message: string;
}

function sendErrorDev(err: HttpException, res: express.Response) {
  res.status(err.httpStatus).json({
    message: err.message,
    code: err.code,
    status: err.status,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProduction(err: HttpException, res: express.Response) {
  res.status(err.httpStatus).json({
    message: err.message,
    code: err.code,
  });
}

export default function errorHandler(
  err: HttpException,
  _req: express.Request,
  res: express.Response,
  _next: NextFunction
) {
  err.httpStatus = err.httpStatus || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProduction(err, res);
  }
}
