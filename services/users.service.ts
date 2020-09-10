import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import configs from "../helpers/configs";
import db from "../helpers/db";

const UserTask = db.User;

async function authenticate({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserTask.findOne({ username });
  if (user) {
    if (user && bcrypt.compareSync(password, user.hash)) {
      const token = jwt.sign({ sub: user.id }, configs.secretKey, {
        expiresIn: "7d",
      });
      return {
        ...user.toJSON(),
        token,
      };
    }
  }
}

async function getAll() {
  return await UserTask.find();
}

async function getById(id: string) {
  return await UserTask.findById(id);
}

async function create(userParam: { username: string; password: string }) {
  if (userParam) {
    const foundUser = await UserTask.findOne({ username: userParam.username });
    if (foundUser) {
      throw 'Username "' + userParam.username + '" is already taken';
    }
    // a document instance
    const createdUser = new UserTask(userParam);
    // hash password
    if (userParam.password) {
      createdUser.hash = bcrypt.hashSync(userParam.password, 10);
    }
    // save user
    await createdUser.save();
  } else {
    console.log("Data validation error !");
  }
}

export default { authenticate, create, getById, getAll };
