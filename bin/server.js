const app = require('../app');
const { connectMongo } = require('../src/db');
const path = require('path');
require('dotenv').config();
const createNewFolder = require('../src/helpers/createFolder');

const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);
const AVATAR_DIR = path.join(
  process.cwd(),
  process.env.PUBLIC_DIR,
  process.env.AVATAR_DIR,
);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, async err => {
      if (err) console.error(`Error at server launch: ${err.message}`);
      await createNewFolder(UPLOAD_DIR);
      await createNewFolder(AVATAR_DIR);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`);
  }
};

start();
