module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'fastfeet',
  database: 'fastfeet_db',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
