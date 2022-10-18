import codes from "../../config/codes";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("activities:middlewares:error");

const generalError = (error, req, res, next) => {
  const errorCode = error.code || codes.internalServerError;
  const errorMessage = error.message || "Internal server error";

  debug(chalk.red(error.privateMessage));

  res.status(errorCode).json({ error: errorMessage });
};

export default generalError;
