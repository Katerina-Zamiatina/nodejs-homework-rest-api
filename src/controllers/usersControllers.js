const fs = require('fs').promises;
const path = require('path');

const {
  findUserByEmail,
  createUser,
  updateUserSubscription,
  updateAvatar,
  verifyUser,
  reVerifyUser,
} = require('../services/userService');

const { userLogin, userLogout } = require('../services/authService');

const editUserAvatar = require('../helpers/editAvatar');

const PORT = process.env.PORT;
const AVATAR_DIR = path.join(
  process.cwd(),
  process.env.PUBLIC_DIR,
  process.env.AVATAR_DIR,
);

const verifyUserController = async (req, res) => {
  const result = await verifyUser(req.params.verifyToken);

  if (result) {
    return res.status(200).json({ message: 'Verification successfull' });
  }
  res
    .status(400)
    .json({ message: 'Verification token is invalid. Please, contact us' });
};

const reVerifyUserController = async (req, res) => {
  const result = await reVerifyUser(req.body.email);

  if (result) {
    return res.status(200).json({ message: 'Verification email sent' });
  }
  res.status(400).json({ message: 'Verification has already been passed' });
};

const updateAvatarController = async (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.filename;

  if (req.file) {
    await editUserAvatar(filePath);

    await fs.rename(filePath, path.join(AVATAR_DIR, fileName));

    const newAvatarUrl = `http://localhost:${PORT}/${process.env.AVATAR_DIR}/${fileName}`;

    const url = await updateAvatar(req.user.id, newAvatarUrl);

    res.status(200).json({ avatarUrl: url, status: 'success' });
  }
  res
    .status(400)
    .json({ message: 'Invalid file. Possible extensions: jpeg, png, jpg' });
};

const getCurrentUserController = async (req, res) => {
  const currentUser = req.user;
  if (currentUser) {
    res.status(200).json({ currentUser, status: 'success' });
  }
  res.status(401).json({ message: 'Not authorized' });
};

const registerController = async (req, res) => {
  const { email, password, subscription, avatarUrl } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    res.status(409).json({ message: 'E-mail is already in use' });
  }

  const newUser = await createUser({
    email,
    password,
    subscription,
    avatarUrl,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
      subscription: newUser.subscription,
    },
    status: 'success',
  });
};

const loginController = async (req, res) => {
  const { email, password, avatarUrl, subscription } = req.body;
  const token = await userLogin({ email, password });
  if (token) {
    res.status(200).json({
      token,
      user: { email, avatarUrl, subscription },
      status: 'success',
    });
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
  updateAvatarController,
  verifyUserController,
  reVerifyUserController,
};
