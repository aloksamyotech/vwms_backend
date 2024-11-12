import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const services = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
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
    onWebsite: {
      type: String,
      default: "listed",
    },
    status: {
      type: String,
      default: "Active",
    },
    discount: {
      type: String,
      default: "0",
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

const Services = mongoose.model(tableNames.services, services);
export default Services;
