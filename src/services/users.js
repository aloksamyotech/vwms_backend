import { errorMessage, statusCodes } from "../common/const.js";
import { decryptText, encryptText } from "../core/helper.js";
import User from "../models/users.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = "JWT_SECRET";

export const createUser = async (req) => {
  try {
    const { name, email, password, role, permissions } = req?.body;

    const isUserAlreadyExist = await User.findOne({ email: email });

    if (isUserAlreadyExist) {
      return {
        message: errorMessage.alreadyExist,
      };
    } else {
      const hashedPassword = encryptText(password);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
        permissions,
      });
      return await newUser.save();
    }
  } catch (err) {
    throw new Error(`${errorMessage.notCreated}  ${err}`);
  }
};

export const loginUser = async (req) => {
  try {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return {
        message: errorMessage.notRegistered,
      };
    }

    const isMatch = decryptText(isUser.password);
    if (isMatch != password) {
      return {
        message: errorMessage.wrongPassword,
      };
    }

    const payload = {
      _id: isUser._id,
      name: isUser.name,
      email: isUser.email,
      role: isUser.role,
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return {
      message: errorMessage.loginSuccessfully,
      token,
    };
  } catch (error) {
    console.error(error);
    return {
      message: errorMessage.loginError,
    };
  }
};

export const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    throw new Error(`${errorMessage.userNotGet} ${err}`);
  }
};

export const updateUser = async (req) => {
  try {
    const { id } = req?.params;
    const { name, role } = req?.body;
    const updateData = { name, role };
    const response = await User.findByIdAndUpdate(id, updateData, {
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

// export const deleteUserById = async (id) => {
//   try {
//     return await User.findByIdAndDelete(id);
//   } catch (err) {
//     throw new Error(`${errorMessage.notDeleted} ${err}`);
//   }
// };
