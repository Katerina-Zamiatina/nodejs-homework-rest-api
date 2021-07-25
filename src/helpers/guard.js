// const passport = require('passport');
// require('../config/config-passport');
const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');
const { findUserByToken } = require('../services/userService');

const guard = async (req, res, next) => {
  try {
    const auth = req.headers['authorization'];

    const [, token] = auth?.split(' ') ?? [];

    if (!token) {
      next(new NotAuthorizedError('Please, provide token'));
    }

    const userDb = await findUserByToken(token);
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (userDb.id === user.id) {
      req.token = token;
      req.user = userDb;
      return next();
    }
    next(new NotAuthorizedError('Invalid token'));
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'));
  }
};

// const guard = (req, res, next) => {
//   console.log('HEADERS', req.headers)
//   passport.authenticate('jwt', { session: false }, (err, user) => {
//     if (err || !user) {
//       return next({ status: 'failure', message: 'Forbidden' });
//     }

//     req.user = user;

//     return next();
//   })(req, res, next);
// };

module.exports = { guard };
