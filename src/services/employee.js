import { errorMessage } from "../common/const.js";
import Employee from "../models/employee.js";

export const createEmployee = async (req) => {
  try {
    const { firstName, lastName, email, phone } = req?.body;
    const isEmployeeAlreadyExist = await Employee.findOne({ email });
    if (isEmployeeAlreadyExist) {
      return {
        message: errorMessage.alreadyExist,
      };
    } else {
      const newEmployee = new Employee({ firstName, lastName, email, phone });
      return await newEmployee.save();
    }
  } catch (err) {
    console.error(err);
    throw new Error(`${errorMessage.notCreated}`);
  }
};

export const getAllEmployee = async () => {
  try {
    return await Employee.find().sort({ updatedAt: -1 });
  } catch (err) {
    throw new Error(`${errorMessage.userNotGet} ${err}`);
  }
};

export const updateEmployee = async (req) => {
  try {
    const { id } = req?.params;
    const { firstName, lastName, phone } = req?.body;
    const updateData = { firstName, lastName, phone };
    const response = await Employee.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!response) {
      throw new Error(`${errorMessage.notFound}`);
    }
    return response;
  } catch (err) {
    throw new Error(`${errorMessage.notUpdated} ${err}`);
  }
};
