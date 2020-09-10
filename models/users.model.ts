import mongoose, { Document, HookNextFunction } from "mongoose";
import { NextFunction } from "express";

interface IUser extends Document {
  username: string;
  hash: string;
  firstName: string;
  lastName: string;
  createdDate: number;
  updatedAt: number;
}

// define schema
const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
    delete ret.hash;
  },
});

userSchema.pre<IUser>("save", function preSave(next) {
  this.updatedAt = Date.now();
  next();
});

// compile schema to model
export default mongoose.model<IUser>("UserTask", userSchema);
