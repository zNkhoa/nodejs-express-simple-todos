import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import configs from "../helpers/configs";
import db from "../helpers/db";
import { BadRequestError, NotFoundError } from "../helpers/errors";

const UserTask = db.User;

interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  hash: string;
}

const USER_NOT_FOUND = 4004;
const USERNAME_PASSWORD_INCORRECT = 4005;
const USERNAME_IS_TAKEN = 4006;
const DATA_VALIDATION_ERROR = 4007;

async function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserTask.findOne({ username });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, configs.secretKey, {
      expiresIn: "7d",
    });
    return {
      ...user.toJSON(),
      token,
    };
  } else {
    throw new BadRequestError(
      USERNAME_PASSWORD_INCORRECT,
      "Username or password is incorrect"
    );
  }
}

async function getAll() {
  return await UserTask.find();
}

async function getById(id: string) {
  try {
    const foundUser = await UserTask.findById(id);
    return foundUser;
  } catch (error) {
    throw new NotFoundError(USER_NOT_FOUND, "User Not Found");
  }
}

async function create(userParam: { username: string; password: string }) {
  const foundUser = await UserTask.findOne({ username: userParam.username });
  if (foundUser) {
    throw new BadRequestError(
      USERNAME_IS_TAKEN,
      `Username ${userParam.username} is already taken`
    );
  }
  // save user
  try {
    // a document instance
    const createdUser = new UserTask(userParam);
    // hash password
    if (userParam.password) {
      createdUser.hash = bcrypt.hashSync(userParam.password, 10);
    }
    await createdUser.save();
  } catch {
    throw new BadRequestError(DATA_VALIDATION_ERROR, `Data validation error`);
  }
}

async function update(id: string, userParam: IUser) {
  const user = await UserTask.findById(id);
  // validate
  if (!user) throw new NotFoundError(USER_NOT_FOUND, "User Not Found");
  if (
    user.username !== userParam.username &&
    (await UserTask.findOne({ username: userParam.username }))
  ) {
    throw new BadRequestError(
      USERNAME_IS_TAKEN,
      `Username ${userParam.username} is already taken by someone`
    );
  }
  try {
    // hash password if it was entered
    if (userParam.password) {
      userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }
    // copy userParam properties to user
    Object.assign(user, userParam);
    await user.save();
  } catch {
    throw new BadRequestError(DATA_VALIDATION_ERROR, `Data validation error`);
  }
}

async function _delete(id: string) {
  await UserTask.findByIdAndRemove(id);
}

export default {
  authenticate,
  create,
  getById,
  getAll,
  update,
  delete: _delete,
};
