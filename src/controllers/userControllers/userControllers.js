import CreateError from "../../utils/CreateError/CreateError.js";
import codes from "../../config/codes.js";
import { Activity, User } from "../../database/runModels.js";
import curateData from "../../utils/curateData/curateData.js";
import { emptyUserModel } from "../../data/emptyModels.js";
import setOptions from "../../utils/setOptions/setOptions.js";

export const newUser = async (req, res, next) => {
  const userData = req.body;

  try {
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

export const joinActivity = async (req, res, next) => {
  const { userId } = req.params;
  const { activityId } = req.query;

  try {
    const user = await User.findByPk(userId);
    const activity = await Activity.findByPk(activityId);

    if (!user || !activity) {
      throw new Error("Invalid user or activity");
    }

    await user.addActivity(activity.id);

    res.status(codes.ok).json({
      success: `Activity with id ${activityId} added to the user with id ${userId}`,
    });
  } catch (error) {
    const privateMessage = error.message;
    const newError = CreateError(
      codes.badRequest,
      privateMessage,
      "Invalid request"
    );
    next(newError);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.findAll(
      setOptions(Activity, true, "name", "description")
    );

    res.status(codes.ok).json({ allUsers });
  } catch (error) {
    const privateMessage = error.message;

    const newError = CreateError(
      codes.badRequest,
      privateMessage,
      "Couldn't retrieve the users"
    );
    next(newError);
  }
};

export default newUser;
