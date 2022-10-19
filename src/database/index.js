import "../loadEnvironment.js";
import environment from "../config/environment.js";
import Sequelize, { DataTypes } from "sequelize";
import Debug from "debug";
import chalk from "chalk";
import SportsCenter from "./models/SportsCenter.js";
import User from "./models/User.js";

const debug = Debug("activities:database:index");

const { dbUsername, dbPassword, dbName, dbHost } = environment;

export const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

const loadModels = () => {
  SportsCenter(sequelize);
  User(sequelize);
};

export const databaseSync = async () => {
  try {
    loadModels();
    await sequelize.sync({ force: true });
    debug(chalk.green("Models were synchronized successfully"));
  } catch (error) {
    debug(chalk.red(`Error while synchronizing the models: ${error}`));
  }
};
