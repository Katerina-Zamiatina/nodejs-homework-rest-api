const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./src/routes/api/users');
const contactsRouter = require('./src/routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const { errorHandler } = require('./src/helpers/apiHelpers');
// const session = require('express-session');
// const passport = require('passport');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use(
//   session({
//     secret: 'secret-word',
//     key: 'session-key',
//     cookie: { path: '/', httpOnly: true, maxAge: null },
//     saveUninitialized: false,
//     resave: false,
//   }),
// );
// require('./config/config-passport');
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
