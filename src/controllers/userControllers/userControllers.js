import CreateError from "../../utils/CreateError/CreateError.js";
import codes from "../../config/codes.js";
import { User } from "../../database/index.js";
import curateData from "../../utils/curateData/curateData.js";
import { emptyUserModel } from "../../data/emptyModels.js";

export const newUser = async (req, res, next) => {
  const userData = req.body;

  try {
    if (!Object.keys(userData).length) {
      throw new Error("Empty request");
    }

    const createdUser = await User.create(curateData(emptyUserModel, userData));
    res.status(codes.created).json({ createdUser });
  } catch (error) {
    const newError = CreateError(
      codes.badRequest,
      error.mesage,
      "Invalid request"
    );
    next(newError);
  }
};

export default newUser;
