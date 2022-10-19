import express from "express";
import morgan from "morgan";
import cors from "cors";
import endpoints from "../config/endpoints.js";
import usersRouter from "./routers/usersRouter.js";
import endpointNotFound from "../middlewares/endpointNotFound/endpointNotFound.js";
import generalError from "../middlewares/generalError/generalError.js";
import sportsCenterRouter from "./routers/sportCentersRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const { users, sportCenters } = endpoints;

app.use(users.router, usersRouter);
app.use(sportCenters.router, sportsCenterRouter);

app.use(endpointNotFound);
app.use(generalError);

export default app;
