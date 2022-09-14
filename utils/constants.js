const {
  PORT = 3001,
  DB_CONN = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT, DB_CONN, NODE_ENV, JWT_SECRET,
};
