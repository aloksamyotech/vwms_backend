import { errorMessage, statusCodes } from "../common/const.js";
import * as inExFeatures from "../services/income_and_expense.js";

export const createInEx = async (req, res) => {
  try {
    const newInEx = await inExFeatures.createInEx(req);
    res.status(statusCodes.created).json(newInEx);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllInEx = async (req, res) => {
  try {
    const inAndEx = await inExFeatures.getAllInEx(req);
    res.status(statusCodes.ok).json(inAndEx);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};


export const editInAndEx = async(req,res) =>{
  
  
  try {
    const inAndEx = await inExFeatures.editInAndEx(req)
    res.status(statusCodes.ok).json(inAndEx)
  } catch (error) {
    res.status(statusCodes.internalServerError).json({message : error.message})
  }
}

export const deleteInAndEx = async (req, res) => {
  try {
    const inAndEx = await inExFeatures.deleteInAndEx(req);
    res.status(statusCodes.ok).json(inAndEx);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
