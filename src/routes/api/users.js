const express = require('express');
const router = new express.Router();

const { asyncWrapper } = require('../../helpers/apiHelpers');

const {
  registerController,
  loginController,
  logoutController,
} = require('../../controllers/usersControllers.js');

router.post('/registration', asyncWrapper(registerController));
router.post('/login', asyncWrapper(loginController));
router.post('/logout', asyncWrapper(logoutController));

module.exports = router;
