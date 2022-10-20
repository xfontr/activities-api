import chalk from "chalk";
import Debug from "debug";
import { ValidationError } from "express-validation";
import codes from "../../config/codes";

const debug = Debug("activities:middlewares:error");
// eslint-disable-next-line no-unused-vars
const validationError = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const errorCode = codes.badRequest;
    const errorMessage = error.message || "Bad request";

    debug(chalk.red("Joi validation error"));

    res.status(errorCode).json({ error: errorMessage });
  }
  next(error);
};

export default validationError;
