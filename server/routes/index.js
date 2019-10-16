const router = require('express').Router();
const user = require('./api/user');
const post = require('./api/post');
const auth = require('./api/auth');
const category = require('./api/category');
const product = require('./api/product');

router.use('/user', user);
router.use('/auth', auth);
router.use('/post', post);
router.use('/category', category);
router.use('/product', product);

module.exports = router;
