import express from "express";
import endpoints from "../../config/endpoints.js";
import newActivity from "../../controllers/activityControllers/activityControllers.js";

const {
  activities: { root },
} = endpoints;

const activitiesRouter = express.Router();

activitiesRouter.post(root, newActivity);

export default activitiesRouter;
