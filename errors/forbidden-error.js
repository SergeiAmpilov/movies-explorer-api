const { FORBIDDEN_ERROR_CODE, FORBIDDEN_ERROR_MSG } = require('./error-codes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_ERROR_CODE;
    this.message = this.message === '' ? FORBIDDEN_ERROR_MSG : this.message;
  }
}

module.exports = ForbiddenError;
