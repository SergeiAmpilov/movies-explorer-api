const { EXIST_ERROR_CODE, EXIST_ERROR_MSG } = require('./error-codes');

class ExistError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ExistError';
    this.statusCode = EXIST_ERROR_CODE;
    this.message = this.message === '' ? EXIST_ERROR_MSG : this.message;
  }
}

module.exports = ExistError;
