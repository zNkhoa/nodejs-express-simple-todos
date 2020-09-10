import express, { NextFunction } from "express";

import userService from "../services/users.service";

const router = express.Router();

// routes
router.get("/", getAll);
router.post("/authenticate", authenticate);
router.post("/register", register);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);

function getAll(
  _req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function authenticate(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function register(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  userService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function getCurrent(
  req: express.Request & { user?: { sub: string } },
  res: express.Response,
  next: NextFunction
) {
  userService
    .getById(req.user ? req.user.sub : "")
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function getById(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  userService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
}

function update(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  userService
    .update(req.params.id, req.body)
    .then(() => res.sendStatus(204))
    .catch((err) => next(err));
}

function _delete(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  userService
    .delete(req.params.id)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

export default router;
