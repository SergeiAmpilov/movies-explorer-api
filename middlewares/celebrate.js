const { celebrate, Joi } = require('celebrate');
const { checkIsCorrectId, regexVal } = require('../utils/check-params');

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

const checkFilmPost = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().integer().required(),
    owner: Joi.string().custom(checkIsCorrectId, 'custom id validation').required(),
    thumbnail: Joi.string().required().pattern(regexVal),
    trailerLink: Joi.string().required().pattern(regexVal),
    image: Joi.string().required().pattern(regexVal),
    description: Joi.string().required(),
    year: Joi.string().min(2).max(4).required(),
    duration: Joi.number().integer().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
  }),
});

module.exports = {
  checkSignIn,
  checkSignUp,
  checkUserUpdate,
  checkMovieId,
  checkFilmPost,
};
