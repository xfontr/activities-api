module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server/*.js",
    "!src/index.js",
    "!src/database/**/*.js",
    "!src/database/*.js",
    "!src/config/*.js",
    "!src/loadEnvironment.js",
    "!src/data/*.js",
  ],
};
