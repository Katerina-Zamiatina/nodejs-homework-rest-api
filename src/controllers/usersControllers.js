const { findUserByEmail, addUser } = require('../services/userService');

const { userLogin, userLogout } = require('../services/authService');

const registerController = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await findUserByEmail(email);
  if (user) {
    res.status(409).json({ message: 'E-mail is already in use' });
  }
  const newUser = await addUser({ email, password, subscription });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
    status: 'success',
  });
};

const loginController = async (req, res) => {
  const { email, password, subscription } = req.body;
  const token = await userLogin({ email, password });
  if (token) {
    res.status(200).json({ token, user: { email, subscription } });
  }

  res.status(401).json({ message: 'E-mail or password is not valid' });
};

const logoutController = async (req, res) => {
  await userLogout(userId);
  res.status(200).json({ token, status: 'success' });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
