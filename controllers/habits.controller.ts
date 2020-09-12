import express, { NextFunction } from "express";
import habitService from "../services/habits.service";
const router = express.Router();

router.get("/owner/:id", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.post("/create", create);

function getAll(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  habitService
    .getAll(req.params.id)
    .then((habits) => res.json(habits))
    .catch((err) => next(err));
}

function getById(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  habitService
    .getById(req.params.id)
    .then((habit) => res.json(habit))
    .catch((err) => next(err));
}

function create(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  habitService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function update(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  habitService
    .update(req.params.id, req.body)
    .then(() => res.sendStatus(204))
    .catch((err) => next(err));
}

function _delete(
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  habitService
    .delete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((err) => next(err));
}

export default router;
