const mongoose = require('mongoose');

/* проверка id объекта в БД */
module.exports.checkIsCorrectId = (value, helpers) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  return helpers.error('invalid.id');
};
