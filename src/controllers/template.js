import { statusCodes } from "../common/const.js";
import * as templates from "../services/template.js";

export const createTemplate = async (req, res) => {
  try {
    const template = await templates.createTemplate(req);
    res.status(statusCodes.created).json(template);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
export const getSMSTemplate = async (req, res) => {
  try {
    const allTemplate = await templates.getSMSTemplate(req);
    res.status(statusCodes.ok).json(allTemplate);
  } catch (error) {
    res.status(statusCodes.notFound).json({ message: error.message });
  }
};
export const getEmailTemplate = async (req, res) => {
  try {
    const allTemplate = await templates.getEmailTemplate(req);
    res.status(statusCodes.ok).json(allTemplate);
  } catch (error) {
    res.status(statusCodes.notFound).json({ message: error.message });
  }
};

export const updateSMSTemplate = async (req, res) => {
  try {
    const updatedTemplate = await templates.updateSMSTemplate(req);
    res.status(statusCodes.ok).json(updatedTemplate);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateEmailTemplate = async (req, res) => {
  try {
    const updatedTemplate = await templates.updateEmailTemplate(req);
    res.status(statusCodes.ok).json(updatedTemplate);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};
