import { errorMessage } from "../common/const.js";
import Packages from "../models/packages.js";

export const createPackage = async (req) => {
  try {
    const { desc, hours, minutes, name, price, type } = req?.body;

    const newPackage = new Packages({
      vehicleType: type,
      desc,
      hours,
      minutes,
      name,
      price,
    });
    return await newPackage.save();
  } catch (error) {
    throw new Error(`${errorMessage.notCreated}`);
  }
};

export const updatePackage = async (req) => {
  try {
    const { id } = req?.params;
    const { desc, hours, minutes, name, status, price, type } = req?.body;

    const updatedData = {
      desc,
      hours,
      minutes,
      name,
      price,
      status,
      vehicleType: type,
    };

    const response = await Packages.findByIdAndUpdate(id, updatedData, {
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
export const getPackage = async () => {
  try {
    const newData = await Packages.aggregate([
      {
        $match: { active: true },
      },
      {
        $lookup: {
          from: "vehicletypes",
          as: "type",
          localField: "vehicleType",
          foreignField: "_id",
        },
      },
      { $unwind: { path: "$type" } },
      { $sort: { updatedAt: -1 } },
    ]);

    return newData;
  } catch (error) {
    throw new Error(`${errorMessage.userNotGet}`);
  }
};

export const deletePackage = async (req) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Packages.findByIdAndUpdate(
      id,
      { active: false },
      { new: true }
    );

    if (!deletedPackage) {
      throw new Error(errorMessage.notFound);
    }

    return deletedPackage;
  } catch (error) {
    console.error(error);
    throw new Error(errorMessage.notDeleted);
  }
};
