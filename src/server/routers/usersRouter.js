import express from "express";
import endpoints from "../../config/endpoints.js";

const {
  users: { root },
} = endpoints;
const usersRouter = express.Router();

usersRouter.post(root);

export default usersRouter;
