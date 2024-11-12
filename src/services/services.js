import { errorMessage } from "../common/const.js";
import Services from "../models/services.js";

export const createService = async (req) => {
  try {
    const { name, desc, price, hours, minutes } = req?.body;
    const newService = new Services({
      name,
      desc,
      price,
      hours,
      minutes,
    });
    return await newService.save();
  } catch (error) {
    throw new Error(`${errorMessage.notCreated}`);
  }
};

export const getAllServices = async () => {
  try {
    return await Services.find({
      active: true,
    }).sort({ updatedAt: -1 });
  } catch (error) {
    throw new Error(`${errorMessage.notFound}`);
  }
};

export const editServices = async (req) => {
  try {
    const { id } = req?.params;
    const { name, desc, price, hours,status, minutes } = req?.body;
    const updatedData = {
      name,
      desc,
      price,
      hours,status,
      minutes,
    };
    const response = await Services.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!response) {
      throw new Error(`${errorMessage.notFound}`);
    }

    return response;
  } catch (error) {
    console.error("Error :", error);
    throw new Error(`${errorMessage.notUpdated}`);
  }
};

export const deleteService = async (req) => {
  try {
    const { id } = req.params;
    const updatedService = await Services.findByIdAndUpdate(id, {
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
