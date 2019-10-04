const express = require('express');
const router = express.Router();

const { loginAuth } = require('../../../controllers/auth.js');

router.post('/', loginAuth);

module.exports = router;
