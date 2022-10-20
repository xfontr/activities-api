import express from "express";
import endpoints from "../../../config/endpoints.js";
import {
  newSportsCenter,
  signUserUp,
} from "../../../controllers/centerControllers/centerControllers.js";
import validateRequest from "../../../middlewares/validateRequest/validateRequest.js";

const {
  sportCenters: { root },
} = endpoints;

const sportsCenterRouter = express.Router();

sportsCenterRouter.post(root, validateRequest, newSportsCenter);
sportsCenterRouter.patch(root, validateRequest, signUserUp);

export default sportsCenterRouter;
