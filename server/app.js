const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'this is first message!!!',
  });
});

app.listen(PORT, () => {
  console.log(`${PORT}번에 접속하였습니다.`);
});
