const { DATA_ERROR_CODE, DATA_ERROR_MSG } = require('./error-codes');

class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataError';
    this.statusCode = DATA_ERROR_CODE;
    this.message = this.message === '' ? DATA_ERROR_MSG : this.message;
  }
}

module.exports = DataError;
