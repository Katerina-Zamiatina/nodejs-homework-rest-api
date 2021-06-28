const express = require('express');
const multer = require('multer');

const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const upload = multer({ dest: '/public/avatars' });

const usersRouter = require('./src/routes/api/users');
const contactsRouter = require('./src/routes/api/contacts');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});



const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const { errorHandler } = require('./src/helpers/apiHelpers');

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use('/api/', apiLimiter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
