import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const payments = new Schema(
  {
    paymentType: {
      type: String,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.customer,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      default: "Pending",
    },
    advancePayment: {
      type: String,
    },
    paidAmount: {
      type: String,
      default: "0",
    },
    remainingAmount: {
      type: String,
    },
    totalPaidAmount: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Payments = mongoose.model(tableNames.payment, payments);

export default Payments;
