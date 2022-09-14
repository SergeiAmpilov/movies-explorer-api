const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const DataError = require('../errors/data-error');
const ExistError = require('../errors/exist-error');

const { NODE_ENV, JWT_SECRET } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      user: {
        name: user.name,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные'));
        return;
      }

      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ExistError('Такой пользователь уже существует'));
        return;
      }

      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError('Переданы некорректные данные'));
        return;
      }

      if (err.name === 'MongoServerError' && err.code === 11000) {
        next(new ExistError('Такой email уже существует'));
        return;
      }

      if (err.name === 'CastError') {
        next(new NotFoundError('Не найден пользователь по указанному id'));
        return;
      }

      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          SameSite: true,
        })
        .send({ message: 'Авотризация успешно выполнена' });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError('Не найден пользователь по указанному id'));
        return;
      }

      next(err);
    });
};
