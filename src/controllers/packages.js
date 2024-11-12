import * as packages from "../services/packages.js";
import { statusCodes } from "../common/const.js";

export const createPackage = async (req, res) => {
  try {
    const newPackage = await packages.createPackage(req);
    res.status(statusCodes.created).json(newPackage);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getPackage = async (req, res) => {
  try {
    const allPackage = await packages.getPackage();
    res.status(statusCodes.ok).json(allPackage);
  } catch (error) {
    console.log(error);
    res.status(statusCodes.notFound).json({ message: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const newPackage = await packages.updatePackage(req);
    res.status(statusCodes.ok).json(newPackage);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const newPackage = await packages.deletePackage(req);
    res.status(statusCodes.ok).json(newPackage);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
