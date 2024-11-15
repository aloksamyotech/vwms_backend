import { errorMessage } from "../common/const.js";
import Payments from "../models/payment.js";

export const editPayments = async (req) => {
  try {
    const { id } = req?.params;
    const { paidAmount, remainingAmount, totalPaidAmount } = req?.body;

    const paymentData = {
      paidAmount,
      remainingAmount,
      totalPaidAmount,
    };

    const response = await Payments.findByIdAndUpdate(id, paymentData, {
      new: true,
    });
    if (!response) {
      throw new Error(`${errorMessage.notFound}`);
    }
    return response;
  } catch (error) {
    throw new Error(`${errorMessage.notUpdated}`);
  }
};

export const allPayments = async (req) => {
  try {
    return await Payments.aggregate([
      {
        $lookup: {
          from: "customers",
          as: "customer",
          localField: "customer",
          foreignField: "_id",
        },
      },
    ]);
  } catch (error) {
    throw new Error(`${errorMessage.notFound}`);
  }
};
