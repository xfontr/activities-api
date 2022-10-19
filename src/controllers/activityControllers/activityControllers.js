import { Activity } from "../../database/index.js";
import codes from "../../config/codes.js";
import CreateError from "../../utils/CreateError/CreateError.js";

const newActivity = async (req, res, next) => {
  const activityData = req.body;

  try {
    const createdActivity = await Activity.create(activityData);

    res.status(codes.created).json({ createdActivity });
  } catch (error) {
    const newError = CreateError(
      codes.badRequest,
      error.mesage,
      "Invalid request"
    );
    next(newError);
  }
};

export default newActivity;
