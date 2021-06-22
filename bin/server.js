const app = require('../app');
const { connectMongo } = require('../src/db');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, err => {
      if (err) console.error(`Error at server launch: ${err.message}`);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
  }
};

start()
