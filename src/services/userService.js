const User = require('../schemas/userModel');
const { v4: uuidv4 } = require('uuid');
const { sendMail } = require('./emailService');

const createUser = async body => {
  const verifyToken = uuidv4();
  const { email } = body;

  await sendMail(verifyToken, email);

  const newUser = new User({ ...body, verifyToken });
  await newUser.save();
  return newUser;
};

const verifyUser = async token => {
  const user = await User.findOne({ verifyToken: token });

  if (user) {
    await user.updateOne({ verify: true, verifyToken: null });
    return true;
  }
};

const reVerifyUser = async email => {
  const user = await User.findOne({ email, verify: false });
  // console.log(user);
  console.log(user.verify);
  // console.log(user.verifyToken);
  if (user) {
    await sendMail(user.verifyToken, email);
  }
};

const findUserById = userId => {
  return User.findById(userId);
};

const findUserByEmail = email => {
  return User.findOne({ email });
};

const findUserByToken = token => {
  return User.findOne({ token }).select('-password');
};

const updateUserToken = (userId, token) => {
  return User.findByIdAndUpdate(userId, { token });
};

const updateUserSubscription = async (userId, subscription) => {
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { subscription },
    { new: true },
  );
  return user;
};

const updateAvatar = async (userId, url) => {
  const { avatarUrl } = await User.findOneAndUpdate(
    { _id: userId },
    { avatarUrl: url },
    { new: true },
  );
  return avatarUrl;
};

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateUserToken,
  findUserByToken,
  updateUserSubscription,
  updateAvatar,
  verifyUser,
  reVerifyUser,
};
