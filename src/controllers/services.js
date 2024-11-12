import { statusCodes } from "../common/const.js";
import * as services from "../services/services.js";

export const createService = async (req, res) => {
  try {
    const service = await services.createService(req);
    res.status(statusCodes.created).json(service);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const service = await services.getAllServices();
    res.status(statusCodes.ok).json(service);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const editServices = async (req, res) => {
  try {
    const service = await services.editServices(req);
    res.status(statusCodes.ok).json(service);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await services.deleteService(req);
    res.status(statusCodes.ok).json(service);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
