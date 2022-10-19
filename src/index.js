import { databaseSync } from "./database/index.js";
import startServer from "./server/startServer.js";

(async () => {
  try {
    startServer();
    await databaseSync();
  } catch (error) {
    process.exit(1);
  }
})();
