import environment from "../config/environment";
import Sequelize from "sequelize";

const { dbUsername, dbPassword, dbName, dbHost } = environment;

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default sequelize;
