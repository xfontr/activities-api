import "../loadEnvironment.js";
import Debug from "debug";
import chalk from "chalk";
import { sequelize } from "./runModels.js";
import runAssociations from "./runAssociations.js";

const debug = Debug("activities:database:index");

const databaseSync = async () => {
  try {
    runAssociations();
    await sequelize.sync({ force: false });

    debug(chalk.green("Models were synchronized successfully"));
  } catch (error) {
    debug(chalk.red(`Error while synchronizing the models: ${error}`));
  }
};

export default databaseSync;
