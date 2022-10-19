import CreateError from "../../utils/CreateError/CreateError.js";
import codes from "../../config/codes.js";
import { User } from "../../database/index.js";
import curateData from "../../utils/curateData/curateData.js";
import { emptyUserModel } from "../../data/emptyModels.js";

export const newUser = async (req, res, next) => {
  const userData = req.body;

  try {
    const newUser = await User.create(curateData(emptyUserModel, userData));
    console.log(newUser);
    res.status(codes.created).json({ newUser });
  } catch (error) {
    const newError = CreateError(
      codes.badRequest,
      error.mesage,
      "Invalid request"
    );
    next(newError);
  }
};
