import express, { NextFunction } from "express";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete(":id", _delete);
router.post("/create", create);

function getAll() {}

function getById() {}

function create(req: { user: string }, res: any, next: any) {
  const userId = req.user;
}

function update() {}

function _delete() {}
