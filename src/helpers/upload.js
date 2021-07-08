const multer = require('multer');
const path = require('path');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg'
    ) {
      cb(null, true);
      return;
    }

    cb(null, false);
  },
});

module.exports = upload;
