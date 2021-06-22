const User = require('../schemas/userModel');

const findUserById = async userId => {
  const user = await User.findById({ userId });
  return user;
};

const findUserByEmail = async email => {
  const user = await User.findOne({ email });
  return user;
};

const addUser = async body => {
  const newUser = await new User(body);
  await newUser.save();
  return newUser;
};

const updateUserToken = async (userId, token) => {
  return await User.findByIdAndUpdate(userId, { token });
};

module.exports = {
  findUserById,
  findUserByEmail,
  addUser,
  updateUserToken,
};
