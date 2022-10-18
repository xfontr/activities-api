import startServer from "./server/startServer.js";

try {
  startServer();
} catch (error) {
  process.exit(1);
}
