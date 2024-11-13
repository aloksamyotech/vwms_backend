import mongoose from "mongoose";
import "dotenv/config";

const dbURL = process.env.CONNECTION_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
    });
    console.log("db connected successfully");
  } catch (err) {
    console.error("error to connect db", err);
  }
};

export default connectDB;
