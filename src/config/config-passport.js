const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { findUserById, findUserByToken } = require('../services/userService');
require('dotenv').config();
SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, async (payload, done) => {
  
    try {
      const user = await findUserById(payload.id);

      if (!user) return done(new Error('User not found'));
      if (!user.token) return done(new Error('Not authorized'));
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);
