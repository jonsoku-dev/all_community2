const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const dbConnect = () =>
  mongoose
    .connect(MONGODB_URI, dbOptions)
    .then(result => console.log('디비에 접속하였습니다 !'))
    .catch(err => console.error(err));

module.exports = dbConnect;
