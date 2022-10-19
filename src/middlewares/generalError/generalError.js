import Debug from "debug";
import chalk from "chalk";
import codes from "../../config/codes.js";

const debug = Debug("activities:middlewares:error");

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  const errorCode = error.code || codes.internalServerError;
  const errorMessage = error.message || "Internal server error";

  debug(chalk.red(error.privateMessage));

  res.status(errorCode).json({ error: errorMessage });
};

export default generalError;
