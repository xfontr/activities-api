import codes from "../../config/codes.js";
import {
  emptySportsCenterModel,
  emptyUserModel,
} from "../../data/emptyModels.js";
import { Activity, SportsCenter, User } from "../../database/runModels.js";
import CreateError from "../../utils/CreateError/CreateError.js";
import curateData from "../../utils/curateData/curateData.js";
import setOptions from "../../utils/setOptions/setOptions.js";

export const newSportsCenter = async (req, res, next) => {
  const centerData = req.body;

  try {
    const createdCenter = await SportsCenter.create(
      curateData(emptySportsCenterModel, centerData)
    );

    res.status(codes.created).json({ createdCenter });
  } catch (error) {
    const newError = CreateError(
      codes.badRequest,
      error.mesage,
      "Invalid request"
    );
    next(newError);
  }
};

export const signUserUp = async (req, res, next) => {
  const { centerId } = req.query;
  const userData = req.body;

  try {
    const sportsCenter = await SportsCenter.findByPk(centerId);

    if (!sportsCenter) {
      throw new Error("The requested sports center doesn't exist");
    }

    if (sportsCenter.users.find(({ id }) => id === userData.id)) {
      throw new Error("The user is already signed up");
    }

    let user;

    if (userData.id) {
      user = await User.findByPk(userData.id);
    } else {
      user = await User.create(curateData(emptyUserModel, userData));
    }

    if (!user) {
      throw new Error(
        "The requested user doesn't exist or the sign up data was not valid"
      );
    }

    sportsCenter.users = [...sportsCenter.users, user.dataValues];

    await sportsCenter.save();

    res.status(codes.ok).json({
      success: `User with id ${user.id} was added to the requested center`,
    });
  } catch (error) {
    const errorMessage = error.message;
    const newError = CreateError(
      codes.badRequest,
      errorMessage,
      "Invalid request. Try providing a valid user id or valid user registration data. Make sure that the provided center ID is correct"
    );
    next(newError);
  }
};

export const getAllCenters = async (req, res, next) => {
  try {
    const allCenters = await SportsCenter.findAll(
      setOptions(Activity, false, "name", "description")
    );

    res.status(codes.ok).json({ allCenters });
  } catch (error) {
    const errorMessage = error.message;
    const newError = CreateError(
      codes.badRequest,
      errorMessage,
      "Couldn't retrieve all the sports centers"
    );
    next(newError);
  }
};
