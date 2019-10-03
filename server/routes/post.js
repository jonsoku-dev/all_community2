const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { getPosts, createPost } = require('../controllers/post');

/* 전체 포스트 불러오기 */
router.get('/', auth, getPosts);
/* 포스트 작성하기 */
router.post('/', auth, createPost);

module.exports = router;
