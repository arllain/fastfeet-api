module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'postgres',
  password: 'fastfeet',
  database: 'fastfeet_db',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
