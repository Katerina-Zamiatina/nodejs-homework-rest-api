const {
  findUserByEmail,
  findUserById,
  addUser,
  updateUserSubscription,
} = require('../services/userService');

const { userLogin, userLogout } = require('../services/authService');

const getCurrentUserController = async (req, res) => {
  const currentUser = req.user;
  if (currentUser) {
    res.status(200).json({ currentUser, status: 'success' });
  }
  res.status(401).json({ message: 'Not authorized' });
};

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
  await userLogout(req.user.id);
  res.status(204).json({ message: 'No content' });
};

const updateSubscriptionController = async (req, res) => {
  const result = await updateUserSubscription(
    req.user.id,
    req.body.subscription,
  );
  if (result) {
    const { email, subscription } = result;

    res.status(200).json({ user: { email, subscription }, status: 'updated' });
  }
};

module.exports = {
  getCurrentUserController,
  registerController,
  loginController,
  logoutController,
  updateSubscriptionController,
};
