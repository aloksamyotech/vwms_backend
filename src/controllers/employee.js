import { statusCodes } from "../common/const.js";
import * as employeeServices from "../services/employee.js";

export const createEmployee = async (req, res) => {
  try {
    const employeeData = await employeeServices.createEmployee(req);

    res.status(statusCodes.created).json(employeeData);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllEmployee = async (req, res) => {
  try {
    const employee = await employeeServices.getAllEmployee();
    res.status(statusCodes.ok).json(employee);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await employeeServices.updateEmployee(req);
    res.status(statusCodes.ok).json(updatedEmployee);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
