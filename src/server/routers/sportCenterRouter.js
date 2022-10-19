import express from "express";
import endpoints from "../../config/endpoints.js";
import newSportsCenter from "../../controllers/centerControllers/centerControllers.js";

const {
  sportCenters: { root },
} = endpoints;

const sportsCenterRouter = express.Router();

sportsCenterRouter.post(root, newSportsCenter);

export default sportsCenterRouter;
