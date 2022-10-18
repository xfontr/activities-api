import "../loadEnvironment.js";
import app from "./index.js";
import environment from "../config/environment.js";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("activities:start");

const { port } = environment;

const startServer = () => {
  const server = app.listen(port, () => {
    debug(chalk.green(`Server listening on port ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red(`Error connecting to the server: ${error}`));
  });
};

export default startServer;
