const { celebrate, Joi } = require('celebrate');
const { checkIsCorrectId } = require('../utils/check-params');

const checkSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const checkSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
});

const checkUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const checkMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().custom(checkIsCorrectId, 'custom id validation'),
  }).messages({
    'invalid.id': 'Некорректный id фильма',
  }),
});

module.exports = {
  checkSignIn,
  checkSignUp,
  checkUserUpdate,
  checkMovieId,
};
