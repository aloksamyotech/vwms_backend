import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const incomeAndExpense = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
const IncomeAndExpense = mongoose.model(
  tableNames.incomeAndExpense,
  incomeAndExpense
);

export default IncomeAndExpense;
