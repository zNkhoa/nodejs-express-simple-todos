import express, { NextFunction } from "express";

import userService from "../services/users.service";

const router = express.Router();

// routes
router.get("/", getAll);
router.post("/authenticate", authenticate);
router.post("/register", register);

function getAll(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  return userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function authenticate(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  return userService
    .authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch((err) => next(err));
}

function register(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  return userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

export default router;
