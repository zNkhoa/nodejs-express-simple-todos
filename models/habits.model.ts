import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./users.model";

export interface IHabit extends Document {
  name: string;
  createdDate: string | number;
  updatedAt: string | number;
  owner: IUser["_id"];
}

const habitSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    immutable: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  topic: {
    type: String,
    default: "",
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

habitSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

habitSchema.pre<IHabit>("save", function preSave(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model<IHabit>("Habit", habitSchema);
