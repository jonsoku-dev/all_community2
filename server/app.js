const express = require('express');
require('dotenv').config();
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const dbConnect = require('./db/dbConnect');
const apiRouter = require('./routes');
const path = require('path');

//! environment
const PORT = process.env.PORT;

//! multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//! static folder
app.use(path.resolve(__dirname, '/', 'images'), express.static(path.join(__dirname, 'images')));

//! middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter }).single('photo'));

//! api Router
app.use('/api', apiRouter);

//! DB + SERVER Connector
dbConnect()
  .then(
    app.listen(PORT, () => {
      console.log(`${PORT}번에 접속하였습니다.`);
    }),
  )
  .catch(err => console.error(err));
