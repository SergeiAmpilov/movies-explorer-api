const mongoose = require('mongoose');

/* проверка id объекта в БД */
module.exports.checkIsCorrectId = (value, helpers) => {
  if (mongoose.isValidObjectId(value)) {
    return value;
  }
  return helpers.error('invalid.id');
};

module.exports.regexVal = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
