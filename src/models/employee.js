import mongoose from "mongoose";
import { tableNames } from "../common/const.js";

const Schema = mongoose.Schema;
const employee = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
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
