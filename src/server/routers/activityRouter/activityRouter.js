import express from "express";
import endpoints from "../../../config/endpoints.js";
import newActivity from "../../../controllers/activityControllers/activityControllers.js";
import validateRequest from "../../../middlewares/validateRequest/validateRequest.js";

const {
  activities: { root },
} = endpoints;

const activitiesRouter = express.Router();

activitiesRouter.post(root, validateRequest, newActivity);

export default activitiesRouter;
