import chalk from "chalk";
import Debug from "debug";
import { ValidationError } from "express-validation";
import codes from "../../config/codes";

const debug = Debug("activities:middlewares:error");

const validationError = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    const errorCode = codes.badRequest;
    const errorMessage = error.message || "Unknown error";

    debug(chalk.red(`Joi validaton error: ${errorMessage}`));

    res.status(errorCode).json({ error: "Bad request" });
  }
  next(error);
};

export default validationError;
