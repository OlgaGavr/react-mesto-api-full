const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-error');
const OwnerError = require('../errors/owner-error');
const CastError = require('../errors/bad-id-error');

function createCard(req, res, next) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') throw new ValidationError('Некорректные данные');
      next(err);
    })
    .catch(next);
}

function getCards(req, res, next) {
  return Card.find({})
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
}

function deleteCard(req, res, next) {
  return Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      if (!card.owner.equals(req.user._id)) {
        throw new OwnerError('Вы не можете удалять карточки других пользователей');
      }
      return Card.findByIdAndRemove(card)
        .then((carddel) => {
          res.status(200).send({ data: carddel });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    })
    .catch(next);
}

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    })
    .catch(next);
};

const disLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError('Нет карточки с таким id'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') throw new CastError('Невалидный ID');
      next(err);
    })
    .catch(next);
};

module.exports = {
  createCard, getCards, deleteCard, likeCard, disLikeCard,
};
