import mongoose from "mongoose";
import { tableNames } from "../common/const.js";
const Schema = mongoose.Schema;

const vehicleType = new Schema(
  {
    vehicleName: {
      type: String,
      required: true,
    },
    vehicleImage: {
      type: String,
      default:
        "https://codeforts.com/washigniter2/assets/uploads/1727764042-Screenshot_2024-10-01_162541.png",
    },
    status: {
      type: String,
      default: "Active",
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

const VehicleType = mongoose.model(tableNames.vehicleType, vehicleType);
export default VehicleType;
