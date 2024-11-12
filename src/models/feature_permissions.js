import mongoose from "mongoose";
import { tableNames } from "../common/const";
const Schema = mongoose.Schema;

const featurePermissions = new Schema(
  {
    feature: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Permissions = mongoose.model(tableNames.permissions, featurePermissions);
export default Permissions;
