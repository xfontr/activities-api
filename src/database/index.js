import "../loadEnvironment.js";
import Sequelize from "sequelize";
import Debug from "debug";
import chalk from "chalk";
import environment from "../config/environment.js";
import SportsCenterModel from "./models/SportsCenter.model.js";
import UserModel from "./models/User.model.js";
import ActivityModel from "./models/Activity.model.js";

const debug = Debug("activities:database:index");

const { dbUsername, dbPassword, dbName, dbHost } = environment;

export const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

const SportsCenter = SportsCenterModel(sequelize);
const Activity = ActivityModel(sequelize);
const User = UserModel(sequelize);

const runAssociations = () => {
  SportsCenter.hasMany(Activity, {
    foreignKey: "centerId",
  });

  Activity.belongsTo(SportsCenter, {
    foreignKey: "id",
    target_key: "centerId",
  });

  Activity.belongsToMany(User, { through: "user_activities" });

  User.belongsToMany(Activity, {
    through: "user_activities",
  });
};

export const databaseSync = async () => {
  try {
    runAssociations();
    await sequelize.sync({ force: false });

    debug(chalk.green("Models were synchronized successfully"));
  } catch (error) {
    debug(chalk.red(`Error while synchronizing the models: ${error}`));
  }
};

export { SportsCenter, User, Activity };
