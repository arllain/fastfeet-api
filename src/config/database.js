require('dotenv/config');

module.exports = {
  // type: 'postgres',
  // url: process.env.DATABASE_URL,
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  // cli: {
  //   migrationsDir: ['src/database/migrations/'],
  //   entitiesDir: 'src/app/models',
  // },

  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
