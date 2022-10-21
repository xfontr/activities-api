import express from "express";
import { validate } from "express-validation";
import endpoints from "../../../config/endpoints.js";
import newActivity, {
  getAllActivities,
} from "../../../controllers/activityControllers/activityControllers.js";
import activitySchema from "../../../schemas/activity.schema.js";

const {
  activities: { root },
} = endpoints;

const activitiesRouter = express.Router();

activitiesRouter.post(root, validate(activitySchema), newActivity);
activitiesRouter.get(root, getAllActivities);

export default activitiesRouter;
