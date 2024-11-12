import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const packages = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    minutes: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      default: "0",
    },
    vehicleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: tableNames.vehicleType,
      required: true,
    },
    status : {
      type : String,
      default : "Active"
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

const Packages = mongoose.model(tableNames.packages, packages);
export default Packages;
