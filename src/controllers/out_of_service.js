import { statusCodes } from "../common/const.js";
import * as outOfService from "../services/out_of_service.js";

export const createOutOfService = async (req, res) => {
    
    
  try {
    const newOutOfService = await outOfService.createOutOfService(req);
    res.status(statusCodes.created).json(newOutOfService);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllOutOfServices = async (req, res) => {
  try {
    const newOutOfService = await outOfService.allOutOfService(req);
    res.status(statusCodes.ok).json(newOutOfService);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deleteOutOfServices = async (req, res) => {
  try {
    const service = await outOfService.deleteOutOfServices(req);
    res.status(statusCodes.ok).json(service);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
