const passport = require('passport');
require('../config/config-passport');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = { guard };
