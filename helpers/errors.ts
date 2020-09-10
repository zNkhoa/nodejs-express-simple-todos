export class AppError extends Error {
  httpStatus: number;
  code: number;
  status: string;
  message: string;
  isOperational: boolean;
  constructor(httpStatus: number, code: number, message: string) {
    super();
    this.httpStatus = httpStatus;
    this.status = `${httpStatus}`.startsWith("4") ? "fail" : "error";
    this.code = code;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(code: number, message: string) {
    super(400, code, message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: number, message: string) {
    super(404, code, message);
  }
}
