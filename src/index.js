import "./loadEnvironment.js";
import express from "express";
import Debug from "debug";
import environment from "./config/environment.js";
import chalk from "chalk";
import morgan from "morgan";
import cors from "cors";

const debug = Debug("sporttia:index");

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.listen(environment.port, () => {
  debug(chalk.green(`Server listening at port ${environment.port}`));
});
