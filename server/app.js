const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbConnect = require('./db/dbConnect');
const apiRouter = require('./routes');

//! environment
const PORT = process.env.PORT;

//! middleware
app.use(cors());
app.use(bodyParser.json());

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
