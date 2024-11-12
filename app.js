import "dotenv/config";
import express from "express";
import connectDB from "./src/common/dbConfig.js";
import userRoutes from "./src/routes/users.js";
import serviceRoutes from "./src/routes/services.js";
import packageRoutes from "./src/routes/packages.js";
import cors from "cors";
import bodyParser from "body-parser";
import inAndExRouter from "./src/routes/income_and_expense.js";
import OutOfService from "./src/routes/out_of_service.js";
import vehicleTypes from "./src/routes/vehicle_type.js";
import customer from "./src/routes/customer.js";
import booking from "./src/routes/booking.js";
import template from "./src/routes/template.js";
import employee from "./src/routes/employee.js";
import paymentRoutes from "./src/routes/payments.js";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//connection db
connectDB();

//routes
app.use("/user", userRoutes);
app.use("/package", packageRoutes);
app.use("/service", serviceRoutes);
app.use("/inandex", inAndExRouter);
app.use("/outofservice", OutOfService);
app.use("/vehicletype", vehicleTypes);
app.use("/customer", customer);
app.use("/booking", booking);
app.use("/template", template);
app.use("/employee", employee);
app.use("/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("server is running on port");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
