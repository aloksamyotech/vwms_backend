import * as userService from "../services/users.js";
import { statusCodes, errorMessage } from "../common/const.js";

export const createUser = async (req, res) => {
  try {
    const userData = await userService.createUser(req);

    res.status(statusCodes.created).json(userData);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const userData = await userService.loginUser(req);
    res.status(statusCodes.ok).json(userData);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(statusCodes.ok).json(users);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req);
    res.status(statusCodes.ok).json(updatedUser);
  } catch (error) {
    res
      .status(statusCodes.internalServerError)
      .json({ message: error.message });
  }
};

// export const deleteUserById = async (req, res) => {
//   try {
//     const deletedUser = await userService.deleteUserById(req.params.id);
//     if (!deletedUser) {
//       return res
//         .status(statusCodes.notFound)
//         .json({ message: errorMessage.notFound });
//     }
//     res
//       .status(statusCodes.ok)
//       .json({ message: errorMessage.successfullyUpdate });
//   } catch (error) {
//     res
//       .status(statusCodes.internalServerError)
//       .json({ message: error.message });
//   }
// };
