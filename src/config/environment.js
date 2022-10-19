const environment = {
  port: +process.env.PORT || 6000,
  dbUsername: process.env.DB_USERNAME || "",
  dbName: process.env.DB_NAME || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbHost: process.env.DB_HOST || "",
};

export default environment;
