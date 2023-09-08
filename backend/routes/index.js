const router = require('express').Router();
const usersRouter = require('./user');
const cardsRouter = require('./card');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const {
  validateUserAuthentication,
  validateUserInfo,
} = require('../middlewares/userValidation');

const { createUser, login } = require('../controllers/user');

router.post('/signup', validateUserInfo, createUser);
router.post('/signin', validateUserAuthentication, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use('*', () => { throw new NotFoundError('Ресурс не найден.'); });

module.exports = router;
