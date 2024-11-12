import { statusCodes } from "../common/const.js";
import * as bookings from "../services/booking.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await bookings.createBooking(req);
    res.status(statusCodes.created).json(booking);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getTodayBookings = async (req, res) => {
  try {
    const allBookings = await bookings.getTodayBookings(req);
    res.status(statusCodes.ok).json(allBookings);
  } catch (error) {
    res.status(statusCodes.notFound).json({ message: error.message });
  }
};
export const getAllBookings = async (req, res) => {
  try {
    const allBookings = await bookings.getAllBookings(req);
    res.status(statusCodes.ok).json(allBookings);
  } catch (error) {
    res.status(statusCodes.notFound).json({ message: error.message });
  }
};


export const bookingReport = async (req, res) => {
  try {
    const allBooking = await bookings.bookingReport(req);
    res.status(statusCodes.ok).json(allBooking);
  } catch (error) {
    res.status(statusCodes.notFound).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const newBooking = await bookings.updateBooking(req);
    console.log(newBooking);
    if (newBooking.status == 500 || newBooking.status == 400) {
      res.status(newBooking.status).json({ message: newBooking?.message });
    } else {
      res.status(statusCodes.ok).json(newBooking);
    }
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
