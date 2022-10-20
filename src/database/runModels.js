import { Sequelize } from "sequelize";
import environment from "../config/environment.js";
import ActivityModel from "./models/Activity.model.js";
import SportsCenterModel from "./models/SportsCenter.model.js";
import UserModel from "./models/User.model.js";

const { dbUsername, dbPassword, dbName, dbHost } = environment;

export const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export const SportsCenter = SportsCenterModel(sequelize);
export const Activity = ActivityModel(sequelize);
export const User = UserModel(sequelize);
