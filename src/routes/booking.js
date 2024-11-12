import express from "express";

import {
  bookingReport,
  createBooking,
  getAllBookings,
  getTodayBookings,
  updateBooking,
} from "../controllers/booking.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.get("/today", getTodayBookings);
router.get("/all/bookingReport/:startDate/:endDate", bookingReport);
router.patch("/edit/:id", updateBooking);

export default router;
