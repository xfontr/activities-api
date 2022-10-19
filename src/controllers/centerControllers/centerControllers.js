import codes from "../../config/codes.js";
import {
  emptySportsCenterModel,
  emptyUserModel,
} from "../../data/emptyModels.js";
import { SportsCenter, User } from "../../database/index.js";
import CreateError from "../../utils/CreateError/CreateError.js";
import curateData from "../../utils/curateData/curateData.js";

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
    if (!Object.keys(userData).length) {
      throw new Error("Empty request");
    }

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
    }

    if (!user) {
      user = await User.create(curateData(emptyUserModel, userData));
    }

    sportsCenter.update({
      ...sportsCenter,
      users: [...sportsCenter.users, { ...user.dataValues }],
    });

    res.status(codes.ok).json({
      success: `User with id ${user.id} was added to the requested center`,
    });
  } catch (error) {
    const newError = CreateError(
      codes.badRequest,
      error.message,
      "Invalid request. The requested center doesn't exist or the user was already signed up"
    );
    next(newError);
  }
};
