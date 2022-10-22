import databaseSync from "./database/index.js";
import queryDatabase from "./database/queries/queryDatabase.js";
import startServer from "./server/startServer.js";
import queries from "./data/queries.js";

(async () => {
  try {
    startServer();
    await databaseSync();
    queryDatabase(queries.usersWithActivities);
  } catch (error) {
    process.exit(1);
  }
})();
