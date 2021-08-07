const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const userRouters = require('./users');
const cardRouters = require('./cards');

router.use('/api/users', userRouters);
router.use('/api/cards', cardRouters);

router.use((req, res, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
});

module.exports = router;
