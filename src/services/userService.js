const User = require('../schemas/userModel');

const findUserById = userId => {
  return User.findById(userId);
};

const findUserByEmail = email => {
  return User.findOne({ email });
};

const addUser = async body => {
  const newUser = new User(body);
  await newUser.save();
  return newUser;
};

const updateUserToken = (userId, token) => {
  return User.findByIdAndUpdate(userId, { token });
};

const findUserByToken = token => {
  return User.findOne({ token }).select('-password');
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
  addUser,
  updateUserToken,
  findUserByToken,
  updateUserSubscription,
  updateAvatar,
};
