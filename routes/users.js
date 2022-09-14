const router = require('express').Router();
const { checkUserUpdate } = require('../middlewares/celebrate');

const {
  updateUser, getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo); /* получить информацию о пользователей */
router.patch('/me', checkUserUpdate, updateUser); /* обновляет профиль */

module.exports = router;
