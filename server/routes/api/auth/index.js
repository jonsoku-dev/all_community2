const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { loadUser, loginAuth } = require('../../../controllers/auth.js');

router.get('/', auth, loadUser);
router.post('/login', loginAuth);

module.exports = router;
