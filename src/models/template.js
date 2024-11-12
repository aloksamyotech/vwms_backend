import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const template = new Schema(
  {
    templateType: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    subject: {
      type: String,
    },
    templateContent: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Template = mongoose.model(tableNames.template, template);

export default Template;
