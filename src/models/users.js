import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const user = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    permission: [],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model(tableNames.users, user);

export default User;
