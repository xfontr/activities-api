import express from "express";
import endpoints from "../../config/endpoints.js";
import { newUser } from "../../controllers/userControllers.js";

const {
  users: { root },
} = endpoints;
const usersRouter = express.Router();

usersRouter.post(root, newUser);

export default usersRouter;
