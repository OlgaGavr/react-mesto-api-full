const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, findByIdUser, updateProfile, updateAvatar, getMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), findByIdUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9~:_@%.#=]{1,256}\.[a-zA-Z0-9]{1,3}([-a-zA-Z0-9~/?!$&'()*+,;:@%.#=]*)?/),
  }),
}), updateAvatar);

module.exports = router;
