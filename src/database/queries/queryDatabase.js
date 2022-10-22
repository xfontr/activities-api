import "../../loadEnvironment.js";
import Debug from "debug";
import chalk from "chalk";
import connection from "./index.js";
import environment from "../../config/environment.js";

const debug = Debug("activities:queries");

const informationMessages = () => {
  debug(
    chalk.yellow(
      "To visualize the requested query on a table, please do log in at the URL https://remotemysql.com/phpmyadmin/index.php and once there place the SQL query to see the results."
    )
  );

  debug(
    chalk.green(
      `Username: ${environment.dbUsername} || Password: ${environment.dbPassword}`
    )
  );
};

const queryDatabase = (query) => {
  connection.query(query, (_, results) => {
    debug(chalk.blue(`USER REQUESTED QUERY: ${query}`));
    // eslint-disable-next-line no-console
    console.log(results);
    informationMessages();
  });
  connection.close();
};

export default queryDatabase;
