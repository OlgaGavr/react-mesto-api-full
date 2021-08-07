const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const MongoError = require('../errors/mongo-error');
const CastError = require('../errors/bad-id-error');
const NotAutorizationError = require('../errors/not-autorization-error');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
console.log(process.env.NODE_ENV);

function getUsers(req, res, next) {
  return User.find({})
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
}

function createUser(req, res, next) {
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new ValidationError('Некорректные данные');
      if (err.name === 'MongoError') throw new MongoError('Пользователь уже существует');
      next(err);
    })
    .catch(next);
}

function findByIdUser(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    })
    .catch(next);
}

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const ownerId = req.user._id;

  const options = { runValidators: true, new: true };

  return User.findByIdAndUpdate(ownerId, { name, about }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new ValidationError('Некорректные данные');
      next(err);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const ownerId = req.user._id;

  const options = { runValidators: true, new: true };

  return User.findByIdAndUpdate(ownerId, { avatar }, options)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') throw new ValidationError('Некорректные данные');
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAutorizationError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotAutorizationError('Неправильные почта или пароль');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

function getMe(req, res, next) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    });
}

module.exports = {
  createUser, getUsers, findByIdUser, updateProfile, updateAvatar, login, getMe,
};
