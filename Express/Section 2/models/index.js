const dbConfig = require("../config/db.config");
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USER, dbConfig.DB_PASSWORD, {
  host: dbConfig.DB_HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.invoice = require('./Invoice')(sequelize, Sequelize);
db.product = require('./Product')(sequelize, Sequelize);
module.exports = db;