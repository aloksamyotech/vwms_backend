import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const customer = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    companyName: {
      type: String,
    },
    bookingId: {
      type: String,
    },

    address: {
      type: String,
    },
    message: {
      type: String,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model(tableNames.customer, customer);

export default Customer;
