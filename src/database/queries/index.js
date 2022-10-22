import mysql from "mysql2";
import environment from "../../config/environment.js";

const { dbUsername, dbPassword, dbName, dbHost } = environment;

const connection = mysql.createConnection({
  host: dbHost,
  user: dbUsername,
  database: dbName,
  password: dbPassword,
});

export default connection;
