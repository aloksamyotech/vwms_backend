import CryptoJS from "crypto-js";
import "dotenv/config";
const SECRETE_KEY = "secretekey";
import moment from "moment";
import nodemailer from "nodemailer";

export const encryptText = (password) => {
  return CryptoJS.AES.encrypt(password, SECRETE_KEY).toString();
};

export const decryptText = (password) => {
  const bytes = CryptoJS.AES.decrypt(password, SECRETE_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const sendEmail = (
  customerData,
  bookingData,
  invoicePath,
  total,
  paymentMethod,
  dateSelected
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aman.asati@samyotech.com",
      pass: "crkc rupb ftgy qpml",
    },
  });

  const mailOptions = {
    from: "aman.asati@samyotech.com",
    to: "aman7999asati@gmail.com",
    subject: `Your Booking is Confirmed, ${bookingData.customer[0].name}! 🚗`,
    html: `<b>Your Booking Details:</b><br>
      <ul>
        <li><strong>Booking Date:</strong> ${moment().format("DD/MM/YYYY")}</li>
        <li><strong>Your Booking Id:</strong> ${bookingData.bookingId}</li>
        <li><strong>Payment Status:</strong> ${bookingData.paymentStatus}</li>
        <li>You can track your booking here: <a href="http://localhost:3000/dashboard/email">Track Booking</a></li>
      </ul>
      <p>Thank you for choosing us! We look forward to serving you.</p>`,
    attachments: [
      {
        filename: `invoice-${bookingData._id}.pdf`,
        path: invoicePath,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error occurred while sending email:", error);
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};
