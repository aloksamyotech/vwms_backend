import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const bookings = new Schema(
  {
    bookingId: {
      type: String,
    },
    services: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.services,
    },
    packages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.packages,
    },
    slot_time: {
      type: String,
    },
    amount: {
      type: Number,
    },

    vehicleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.vehicleType,
    },

    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.payment,
    },
    serviceStatus: {
      type: String,
      default: "Pending",
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.customer,
    },
    paymentMethod: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.payment,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.employee,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Bookings = mongoose.model(tableNames.bookings, bookings);

export default Bookings;
