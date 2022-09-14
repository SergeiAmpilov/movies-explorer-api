const router = require('express').Router();

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { checkSignIn, checkSignUp } = require('../middlewares/celebrate');
const { login, createUser, logout } = require('../controllers/users');

const { notFoundRequest } = require('../middlewares/error');

router.post('/signin', checkSignIn, login);
router.post('/signup', checkSignUp, createUser);
router.post('/signout', logout);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', notFoundRequest);

module.exports = router;
