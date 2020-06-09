require('dotenv/config');

module.exports = {
  development: {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,

    define: {
      timestamp: true,
      underscored: true,
      underscoredAll: true,
    },
  },
  production: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
};

// module.exports = {
//   type: 'postgres',
//   url: process.env.DATABASE_URL,
//   dialect: 'postgres',
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,

//   define: {
//     timestamp: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };
