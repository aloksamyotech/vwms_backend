import Bookings from "../models/booking";

export const bookingCount = async () => {
  const response = await Bookings.countDocuments({});
};
