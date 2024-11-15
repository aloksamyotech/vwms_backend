import mongoose from "mongoose";

const permissionsSchema = new mongoose.Schema({
  vehicleType: { type: Boolean, default: false },
  serviceList: { type: Boolean, default: false },
  packages: { type: Boolean, default: false },
  bookings: { type: Boolean, default: false },
  paymentTransaction: { type: Boolean, default: false },
  outOfService: { type: Boolean, default: false },
  incomeExpense: { type: Boolean, default: false },
  users: { type: Boolean, default: false },
  reports: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "employee",
  },
  permissions: { type: permissionsSchema, required: true },
  active : {
    type : String,
    default : "Active"
  },
  status : {
    type : String,
    default : "Active"
  }
});

const User = mongoose.model("User", userSchema);

export default User;
