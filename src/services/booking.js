import { errorMessage } from "../common/const.js";
import Bookings from "../models/booking.js";
import Customer from "../models/customer.js";
import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";
import { sendEmail } from "../core/helper.js";
import Payments from "../models/payment.js";

export const createBooking = async (req) => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const correctDirname = __dirname.startsWith("/C:")
    ? __dirname.slice(1)
    : __dirname;

  const {
    name,
    email,
    phone,
    advancePayment,
    packagePrice,
    vehicleType,
    vehicleName,
    packageName,
    vehicleId,
    bookingId,
    packageId,
    selectedPackage,
    selectedVehicle,
    selectedSlots,
    companyName,
    dateSelected,
    address,
    message,
    packages,
    total,
    services,
    slot_time,
    paymentType,
  } = req?.body;

  try {
    const newCustomer = new Customer({
      bookingId,
      name,
      email,
      phone,
      companyName,
      address,
      message,
      bookingId,
    });
    const customerData = await newCustomer.save();
    const payment = new Payments({
      paymentType: paymentType,
      customer: customerData?._id,
      amount: packagePrice,
      advancePayment: advancePayment,
    });
    const paymentData = await payment.save();

    const newBooking = new Bookings({
      services,
      slot_time: dateSelected,
      vehicleType: vehicleId,
      packages: packageId,
      amount: total,
      bookingId,
      customer: customerData?._id,
      payment: paymentData?._id,
    });

    const bookingData = await newBooking.save();

    const newBookingData = await Bookings.aggregate([
      { $match: { _id: bookingData._id, active: true } },
      {
        $lookup: {
          from: "vehicletypes",
          as: "vehicleType",
          localField: "vehicleType",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "packages",
          as: "packages",
          localField: "packages",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "customers",
          as: "customer",
          localField: "customer",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "payments",
          as: "payments",
          localField: "payment",
          foreignField: "_id",
        },
      },
    ]);

    const generateInvoicePDF = (bookingData) => {
      const doc = new PDFDocument({ margin: 20, size: "A5" });
      const invoiceDir = path.join(correctDirname, "invoices");

      if (!fs.existsSync(invoiceDir)) {
        fs.mkdirSync(invoiceDir, { recursive: true });
      }

      const invoicePath = path.join(
        invoiceDir,
        `${bookingData._id}-invoice.pdf`
      );
      const writeStream = fs.createWriteStream(invoicePath);
      doc.pipe(writeStream);

      const padding = 10;

      doc
        .rect(
          padding,
          padding,
          doc.page.width - 2 * padding,
          doc.page.height - 2 * padding
        )
        .strokeColor("red")
        .lineWidth(1)
        .stroke();

      const logoPath = path.join(correctDirname, "car_wash_logo.jpg");
      const logoWidth = 80;
      const logoHeight = 40;

      doc.image(logoPath, 30, 10, { width: logoWidth, height: logoHeight });

      doc
        .fontSize(10)
        .fillColor("#333")
        .font("Helvetica-Bold")
        .text(new Date().toLocaleDateString(), {
          align: "right",
          continued: false,
        });

      doc
        .fontSize(16)
        .font("Helvetica-Bold")
        .fillColor("red")
        .text("Booking Invoice", { align: "center", baseline: "middle" });

      doc.moveDown(1);

      doc.font("Helvetica-Bold").fontSize(12).text("Customer Details");
      doc.moveDown(1);
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#333")
        .text(`Name: ${bookingData.customer[0]?.name || ""}`);
      doc
        .moveDown(1)
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#333")
        .text(`Booking Id: ${bookingData.bookingId || ""}`);

      doc.moveDown(1).text(`Email: ${bookingData.customer[0]?.email || ""}`);
      doc.moveDown(1).text(`Phone: ${bookingData.customer[0]?.phone || ""}`);

      doc.moveDown(1.5);

      doc
        .font("Helvetica-Bold")
        .fillColor("red")
        .fontSize(12)
        .text("Booking Details");
      doc.moveDown(1);
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#333")
        .text(`Selected Package: ${bookingData.packages[0]?.name || ""}`);
      doc
        .moveDown(1)
        .text(
          `Selected Vehicle: ${bookingData.vehicleType[0]?.vehicleName || ""}`
        );
      doc
        .moveDown(1)
        .text(`Total Amount: ₹${bookingData.packages[0]?.price || "0"}`);
      doc
        .moveDown(1)
        .text(`Payment Status: ${bookingData.paymentStatus || ""}`);
      doc
        .moveDown(1)
        .text(`Booking For Date: ${bookingData.dateSelected || ""}`);

      const signatureText =
        "© Vehicle Wash Management System. All rights reserved.";
      doc
        .moveDown(2)
        .font("Helvetica-Bold")
        .fontSize(10)
        .fillColor("#333")
        .text(signatureText, { align: "center" });

      doc.end();

      return invoicePath;
    };

    const invoicePath = generateInvoicePDF(newBookingData[0]);

    await sendEmail(
      customerData,
      newBookingData[0],
      invoicePath,
      total,
      paymentType,
      dateSelected
    );

    return {
      slot_time: slot_time,
      dateSelected: dateSelected,
      booking: newBookingData,
      payment: paymentData,
    };
  } catch (error) {
    throw new Error("An error occurred during booking.");
  }
};

export const getTodayBookings = async () => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const newBooking = await Bookings.aggregate([
      {
        $match: {
          active: true,
          updatedAt: {
            $gte: todayStart,
            $lt: todayEnd,
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          as: "type",
          localField: "customer",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "payments",
          as: "payments",
          localField: "payment",
          foreignField: "_id",
        },
      },

      {
        $lookup: {
          from: "vehicletypes",
          as: "vehicleType",
          localField: "vehicleType",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "packages",
          as: "packages",
          localField: "packages",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "users",
          as: "employee",
          localField: "employee",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "services",
          as: "service",
          localField: "services",
          foreignField: "_id",
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);
    return newBooking;
  } catch (error) {
    throw new Error(`${errorMessage.userNotGet}`);
  }
};

export const getAllBookings = async () => {
  try {
    const newBooking = await Bookings.aggregate([
      {
        $match: {
          active: true,
        },
      },
      {
        $lookup: {
          from: "payments",
          as: "payments",
          localField: "payment",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "customers",
          as: "type",
          localField: "customer",
          foreignField: "_id",
        },
      },

      {
        $lookup: {
          from: "payments",
          as: "paymentMethod",
          localField: "paymentMethod",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "users",
          as: "employee",
          localField: "employee",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "vehicletypes",
          as: "vehicleType",
          localField: "vehicleType",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "packages",
          as: "packages",
          localField: "packages",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "services",
          as: "service",
          localField: "services",
          foreignField: "_id",
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);
    return newBooking;
  } catch (error) {
    throw new Error(`${errorMessage.userNotGet}`);
  }
};

export const updateBooking = async (req, res) => {
  try {
    const { id } = req?.params;
    const { status, assignedTo, slot_time } = req?.body;

    const updatedData = {
      serviceStatus: status,
      employee: assignedTo,
    };

    const isAvailable = await checkAvailability(slot_time, assignedTo, id);
    const isEmployee = await checkEmployee(assignedTo, id);

    if (!isEmployee) {
      if (!isAvailable) {
        return {
          status: 200,
          message: errorMessage.slot_unavailable,
          errorCode: 400,
        };
      }
    }
    const response = await Bookings.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!response) {
      return { status: 200, message: errorMessage.notFound, errorCode: 500 };
    }
    return response;
  } catch (error) {
    throw new Error(`${errorMessage.notUpdated}`);
  }
};
export async function checkAvailability(slot, employee, id) {
  const employeeBooking = await Bookings.find({
    employee: employee,
    slot_time: slot,
  });
  return employeeBooking?.length === 0;
}
export async function checkEmployee(employee, id) {
  const employeeFind = await Bookings.findById(id);
  if (employee == employeeFind?.employee) {
    return true;
  }
}

export const bookingReport = async (req, res) => {
  const { startDate, endDate } = req.params;

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  parsedEndDate.setHours(23, 59, 59, 999);

  try {
    const newBooking = await Bookings.aggregate([
      {
        $match: {
          active: true,
          createdAt: {
            $gte: parsedStartDate,
            $lte: parsedEndDate,
          },
        },
      },
      {
        $lookup: {
          from: "customers",
          as: "customer",
          localField: "customer",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "users",
          as: "employee",
          localField: "employee",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "payments",
          as: "paymentMethod",
          localField: "paymentMethod",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "vehicletypes",
          as: "vehicleType",
          localField: "vehicleType",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "packages",
          as: "packages",
          localField: "packages",
          foreignField: "_id",
        },
      },
      {
        $lookup: {
          from: "services",
          as: "service",
          localField: "services",
          foreignField: "_id",
        },
      },
      { $sort: { updatedAt: -1 } },
    ]);
    return newBooking;
  } catch (error) {
    throw new Error(`${errorMessage.notCreated}`);
  }
};
