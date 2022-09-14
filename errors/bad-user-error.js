const { MONGO_ERROR_CODE, MONGO_ERROR_MSG } = require('./error-codes');

class BadUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadUserError';
    this.statusCode = MONGO_ERROR_CODE;
    this.message = this.message === '' ? MONGO_ERROR_MSG : this.message;
  }
}

module.exports = BadUserError;
