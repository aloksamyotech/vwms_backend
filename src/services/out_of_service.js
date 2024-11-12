import { errorMessage } from "../common/const.js";
import OutOfService from "../models/out_of_service.js";

export const createOutOfService = async (req) => {
  try {
    const { startDate, endDate, desc } = req.body;
    const newOutOfService = new OutOfService({
      startDate,
      endDate,
      desc,
    });
    return await newOutOfService.save();
  } catch (error) {
    throw new Error(`${errorMessage.notCreated}`);
  }
};

export const allOutOfService = async () => {
  try {
    return await OutOfService.find({
      active: true,
    }).sort({ updatedAt: -1 });
  } catch (error) {
    throw new Error(`${errorMessage.notFound}`);
  }
};

export const deleteOutOfServices = async (req) => {
  try {
    const { id } = req.params;
    const updatedService = await OutOfService.findByIdAndUpdate(id, {
      active: false,
    });
    if (!updatedService) {
      throw new Error(`${errorMessage.notFound}`);
    }
    return updatedService;
  } catch (error) {
    throw new Error(`${errorMessage.notDeleted}`);
  }
};
