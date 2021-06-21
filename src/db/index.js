const mongoose = require('mongoose');
require('dotenv').config();

const urlDb = process.env.URL_DB;

const connectMongo = async () => {
  const client = await mongoose.connect(urlDb, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  return client;
};


mongoose.connection.on('connected', () => {
    console.log('Mongoose connected');
});

mongoose.connection.on('error', err => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Connection for DB is closed & app is terminated');
    process.exit();
  });
});

module.exports = { connectMongo };
