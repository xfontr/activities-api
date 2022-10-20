import express from "express";
import { validate } from "express-validation";
import endpoints from "../../../config/endpoints.js";
import {
  newSportsCenter,
  signUserUp,
} from "../../../controllers/centerControllers/centerControllers.js";
import validateRequest from "../../../middlewares/validateRequest/validateRequest.js";
import sportCenterSchema from "../../../schemas/sportCenter.schema.js";

const {
  sportCenters: { root },
} = endpoints;

const sportsCenterRouter = express.Router();

sportsCenterRouter.post(root, validate(sportCenterSchema), newSportsCenter);
sportsCenterRouter.patch(root, validateRequest, signUserUp);

export default sportsCenterRouter;
