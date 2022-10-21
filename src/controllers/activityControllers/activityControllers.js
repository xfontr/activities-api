import { Activity, SportsCenter } from "../../database/runModels.js";
import codes from "../../config/codes.js";
import CreateError from "../../utils/CreateError/CreateError.js";
import setOptions from "../../utils/setOptions/setOptions.js";

const newActivity = async (req, res, next) => {
  const activityData = req.body;

  try {
    const createdActivity = await Activity.create(activityData);

    res.status(codes.created).json({ createdActivity });
  } catch (error) {
    const errorMessage = error.message;
    const newError = CreateError(
      codes.badRequest,
      errorMessage,
      "Invalid request"
    );
    next(newError);
  }
};

export const getAllActivities = async (req, res, next) => {
  try {
    const allActivities = await Activity.findAll(
      setOptions(SportsCenter, false, "name", "description")
    );

    res.status(codes.ok).json({ allActivities });
  } catch (error) {
    const errorMessage = error.message;
    const newError = CreateError(
      codes.badRequest,
      errorMessage,
      "Couldn't retrieve the activities"
    );
    next(newError);
  }
};

export default newActivity;
