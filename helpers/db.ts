import mongoose from "mongoose";
import configs from "./configs";

import UserModel from "../models/users.model";

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(configs.dbURI || "", connectionOptions);

mongoose.Promise = global.Promise;

export default {
  User: UserModel,
};
