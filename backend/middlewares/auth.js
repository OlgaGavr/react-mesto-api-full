const jwt = require('jsonwebtoken');
const NotAutorizationError = require('../errors/not-autorization-error');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotAutorizationError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (e) {
    const err = new NotAutorizationError('Необходима авторизация');
    next(err);
  }
  req.user = payload;
  next();
};
