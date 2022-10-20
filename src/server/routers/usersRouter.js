import express from "express";
import endpoints from "../../config/endpoints.js";
import {
  joinActivity,
  newUser,
} from "../../controllers/userControllers/userControllers.js";

const {
  users: { root, user },
} = endpoints;
const usersRouter = express.Router();

usersRouter.post(root, newUser);
usersRouter.patch(user, joinActivity);

export default usersRouter;
