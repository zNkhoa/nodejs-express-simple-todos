import express, { NextFunction } from "express";

interface HttpException extends Error {
  status: number;
  message: string;
}

export default function errorHandler(
  err: HttpException,
  _req: express.Request,
  res: express.Response,
  _next: NextFunction
) {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "Invalid token" });
  }

  return res.status(500).json({ message: err.message });
}
