import { errorMessage } from "../common/const.js";
import Template from "../models/template.js";

export const createTemplate = async (req) => {
  try {
    const { templateType, name, subject, templateContent } = req?.body;
    const newTemplate = new Template({
      templateType,
      templateContent,
      name,
      subject,
    });
    return await newTemplate.save();
  } catch (error) {
    throw new Error(`${errorMessage.notCreated}`);
  }
};
export const updateEmailTemplate = async (req) => {
  try {
    const { id } = req?.params;
    const { name, templateContent, subject } = req?.body;
    const updateTemplate = {
      name,
      templateContent,
      subject,
    };
    const response = await Template.findByIdAndUpdate(id, updateTemplate, {
      new: true,
    });
    if (!response) {
      throw new Error(`${errorMessage.notFound}`);
    }
    return response;
  } catch (error) {
    throw new Error(`${errorMessage.notFound}`);
  }
};
export const updateSMSTemplate = async (req) => {
  try {
    const { id } = req?.params;
    const { name, templateContent } = req?.body;
    const updatedTemplate = {
      name,
      templateContent,
    };
    const response = await Template.findByIdAndUpdate(id, updatedTemplate, {
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
export const getSMSTemplate = async (req) => {
  try {
    const allTemplate = await Template.aggregate([
      { $match: { active: true } },
      { $match: { templateType: "SMSTemplate" } },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    return allTemplate;
  } catch (error) {
    throw new Error(`${errorMessage.userNotGet}`);
  }
};
export const getEmailTemplate = async (req) => {
  try {
    const allTemplate = await Template.aggregate([
      { $match: { active: true } },
      { $match: { templateType: "email" } },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    return allTemplate;
  } catch (error) {
    throw new Error(`${errorMessage.userNotGet}`);
  }
};
