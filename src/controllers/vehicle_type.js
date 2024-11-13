import { statusCodes } from "../common/const.js";
import * as vehicleFeatures from "../services/vehicle_type.js";

export const createVehicle = async (req, res) => {
  try {
    const newVehicle = await vehicleFeatures.createVehicle(req);
    res.status(statusCodes.created).json(newVehicle);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const status = await vehicleFeatures.updateStatus(req);
    res.status(statusCodes.ok).json(status);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicleType = await vehicleFeatures.findVehicleById(req);
    res.status(statusCodes.ok).json(vehicleType);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllVehicle = async (req, res) => {
  try {
    const findVehicle = await vehicleFeatures.getAllVehicle(req);
    res.status(statusCodes.ok).json(findVehicle);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleFeatures.deleteVehicle(req);
    res.status(statusCodes.ok).json(vehicle);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
