require('dotenv/config');

console.log(`process.env.DB_USER = ${process.env.DB_USER}`);
console.log(`process.env.DB_PASS = ${process.env.DB_PASS}`);
console.log(`process.env.DB_HOST = ${process.env.DB_HOST}`);
console.log(`process.env.DB_PORT = ${process.env.DB_PORT}`);
console.log(`process.env.DB_NAME = ${process.env.DB_NAME}`);

module.exports = {
  type: 'postgres',
  // url: process.env.DATABASE_URL,
  dialect: 'postgres',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
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
