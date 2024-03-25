module.exports = {
  HOST: "blockchain-explorer-dev.c1q8wu2wwo4b.us-east-2.rds.amazonaws.com",
  USER: "postgres",
  PASSWORD: "blockchain-explorer-dev-2024",
  DB: "blockchain",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000, //maximum time in milliseconds that pool will try to get connection before throwing error
    idle: 10000 //maximum time in milliseconds that a connection can be idle before being released
  }
};