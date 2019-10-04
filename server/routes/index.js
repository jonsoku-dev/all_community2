const router = require('express').Router();
const user = require('./api/user');
const post = require('./api/post');
const auth = require('./api/auth');

router.use('/user', user);
router.use('/auth', auth);
router.use('/post', post);

module.exports = router;
