require('dotenv/config');

module.exports = {
  type: 'postgres',
  dialect: 'postgres',
  url: process.env.DATABASE_URL,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false,
  },

  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
