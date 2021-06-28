const express = require('express');
const router = new express.Router();

const { userValidation } = require('../../middlewares/userValidation.js');

const { asyncWrapper } = require('../../helpers/apiHelpers');

const {
  getCurrentUserController,
  registerController,
  loginController,
  logoutController,
  updateSubscriptionController,
} = require('../../controllers/usersControllers.js');

const { guard } = require('../../helpers/guard');

router.get('/current', guard, asyncWrapper(getCurrentUserController));
router.post('/registration', userValidation, asyncWrapper(registerController));
router.post('/login', userValidation, asyncWrapper(loginController));
router.post('/logout', guard, asyncWrapper(logoutController));
router.patch('/', guard, asyncWrapper(updateSubscriptionController));
router.patch('/avatars', guard, asyncWrapper())

module.exports = router;
