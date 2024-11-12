import { errorMessage } from "../common/const.js";
import VehicleType from "../models/vehicleType.js";

export const createVehicle = async (req) => {
  try {
    const { vehicleType } = req?.body;
    let vehicleImage = "";

    if (req.file) {
      vehicleImage = req.file.path;
    }

    const newVehicle = new VehicleType({
      vehicleName: vehicleType,
      vehicleImage: vehicleImage,
    });

    await newVehicle.save();

    return newVehicle;
  } catch (error) {
    throw new Error(`${errorMessage.notRegistered}`);
  }
};

export const findVehicleById = async (req) => {
  try {
    const { id } = req?.params;
    const vehicleType = await VehicleType.findById(id);
    return vehicleType;
  } catch (error) {
    throw new Error(`${errorMessage.notFound}`);
  }
};

export const getAllVehicle = async () => {
  try {
    return await VehicleType.find({
      active: true,
    })
      .sort({ updatedAt: -1 })
      .lean();
  } catch (error) {
    throw new Error(`${errorMessage.notFound}`);
  }
};

export const updateStatus = async (req) => {
  try {
    const { id } = req?.params;
    const { status } = req?.body;
    const updateStatus = {
      status,
    };
    const response = await VehicleType.findByIdAndUpdate(id, updateStatus, {
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

export const deleteVehicle = async (req) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await VehicleType.findByIdAndUpdate(id, {
      active: false,
    });

    if (!deletedVehicle) {
      throw new Error(`${errorMessage.notFound}`);
    }
  } catch (error) {
    throw new Error(`${errorMessage.notDeleted}`);
  }
};
