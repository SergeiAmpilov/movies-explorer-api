const { NOT_FOUND_ERROR_CODE, NOT_FOUND_ERROR_MSG } = require('./error-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoFoundError';
    this.statusCode = NOT_FOUND_ERROR_CODE;
    this.message = this.message === '' ? NOT_FOUND_ERROR_MSG : this.message;
  }
}

module.exports = NotFoundError;
