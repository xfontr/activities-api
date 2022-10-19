import "../loadEnvironment.js";
import environment from "../config/environment.js";
import Sequelize from "sequelize";
import Debug from "debug";
import chalk from "chalk";
import SportsCenterModel from "./models/SportsCenter.model.js";
import UserModel from "./models/User.model.js";
import ActivityModel from "./models/Activity.model.js";

const debug = Debug("activities:database:index");

const { dbUsername, dbPassword, dbName, dbHost } = environment;

export const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export const SportsCenter = SportsCenterModel(sequelize);
export const User = UserModel(sequelize);
export const Activity = ActivityModel(sequelize);

export const databaseSync = async () => {
  try {
    await sequelize.sync({ force: false });
    debug(chalk.green("Models were synchronized successfully"));
  } catch (error) {
    debug(chalk.red(`Error while synchronizing the models: ${error}`));
  }
};
