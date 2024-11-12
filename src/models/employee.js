import mongoose from "mongoose";
import { tableNames } from "../common/const.js";

const Schema = mongoose.Schema;
const employee = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Active",
    },
    slot_time: {
      type: String,
      default : 'hello'
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model(tableNames.employee, employee);
export default Employee;
