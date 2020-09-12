import { Schema } from "mongoose";
import db from "../helpers/db";
import { IHabit } from "../models/habits.model";
import { BadRequestError, NotFoundError } from "../helpers/errors";
import { IUser } from "../models/users.model";

const Habit = db.Habit;

const HABIT_NOT_FOUND = 5004;
const DATA_VALIDATION_ERROR = 5007;

interface ICreatHabitParam {
  owner: string;
  name: string;
  description?: string;
  topic?: string;
}

interface IUpdateHabitParam {
  name: string;
  description: string;
  topic: string;
}

async function getAll(userId: IUser["_id"]) {
  try {
    return await Habit.find({ owner: userId });
  } catch (err) {
    return [];
  }
}

async function getById(id: IHabit["_id"]) {
  try {
    return await Habit.findById(id);
  } catch (err) {
    return {};
  }
}

async function create(habitParams: ICreatHabitParam) {
  try {
    const createdHabit = new Habit(habitParams);
    await createdHabit.save();
  } catch {
    throw new BadRequestError(DATA_VALIDATION_ERROR, "Data Validation Error");
  }
}

async function update(id: IHabit["_id"], habitParams: IUpdateHabitParam) {
  try {
    const foundHabit = await Habit.findById(id);
    if (!foundHabit) {
      throw new NotFoundError(HABIT_NOT_FOUND, "Habit Not Found");
    }
    // const updatedHabit = { ...foundHabit, ...habitParams };
    Object.assign(foundHabit, habitParams);
    await foundHabit.save();
  } catch {
    throw new BadRequestError(DATA_VALIDATION_ERROR, "Data Validation Error");
  }
}

async function _delete(id: IHabit["_id"]) {
  try {
    await Habit.findByIdAndRemove(id);
  } catch (error) {
    throw new BadRequestError(DATA_VALIDATION_ERROR, "Data Validation Error");
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};
