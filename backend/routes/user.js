const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/user');

const {
  validateAvatarUpdate,
  validateUserId,
  validateUserUpdate,
} = require('../middlewares/userValidation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = router;
