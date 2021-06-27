const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const { updateUserToken, findUserByEmail } = require('./userService');

const userLogin = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user ||  !await user.validPassword(password)) {
    return null;
  }
  const id = user.id;
  const payload = { id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  await updateUserToken(id, token);
  return token;
};

const userLogout = async id => {
  const data = await updateUserToken(id, null);
  return data;
};

module.exports = {
  userLogin,
  userLogout,
};
