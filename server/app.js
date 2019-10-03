const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dbConnect = require('./db/dbConnect');
const postRouter = require('./routes/post');

const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/post', postRouter);

dbConnect()
  .then(
    app.listen(PORT, () => {
      console.log(`${PORT}번에 접속하였습니다.`);
    }),
  )
  .catch(err => console.error(err));
