import express from "express";
import { validate } from "express-validation";
import endpoints from "../../../config/endpoints.js";
import {
  getAllUsers,
  joinActivity,
  newUser,
} from "../../../controllers/userControllers/userControllers.js";
import validateRequest from "../../../middlewares/validateRequest/validateRequest.js";
import userSchema from "../../../schemas/user.schema.js";

const {
  users: { root, user },
} = endpoints;
const usersRouter = express.Router();

usersRouter.post(root, validate(userSchema), validateRequest, newUser);
usersRouter.patch(user, joinActivity);
usersRouter.get(root, getAllUsers);

export default usersRouter;
