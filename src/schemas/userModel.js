const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const garavatar = require('gravatar');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
  },
  avatarUrl: {
    type: String,
    default: function () {
      return garavatar.url(this.email, { s: '250' }, true);
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'buisness'],
    default: 'starter',
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(8));
  next();
});

userSchema.methods.validPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.path('email').validate(function (value) {
  const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return regex.test(String(value).toLowerCase());
});

const User = mongoose.model('user', userSchema);

module.exports = User;
