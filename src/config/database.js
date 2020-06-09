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
  test: {
    username: process.env.PGUSER || 'root',
    password: null,
    database: 'react_webpack_node_test',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
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
