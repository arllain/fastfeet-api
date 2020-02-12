require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5434,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
