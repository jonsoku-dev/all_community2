const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const {
  getPosts,
  getPost,
  createPost,
  deletePost,
  Like,
  unLike,
  createPostComment,
  deletePostComment,
} = require('../../../controllers/post');
const { check } = require('express-validator');

/* 전체 포스트 불러오기 */
router.get('/', auth, getPosts);

/* 포스트 불러오기 */
router.get('/:id', auth, getPost);

/* 포스트 작성하기 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
    ],
  ],
  createPost,
);

/* 포스트 삭제하기 */
router.delete('/:id', auth, deletePost);

/* 좋아요!! */
router.put('/like/:id', auth, Like);

/* 좋아요 취소 !*/
router.put('/unlike/:id', auth, unLike);

/* 댓글 달기 !*/
router.post('/:id/comment', auth, createPostComment);

/* 댓글 삭제 !*/
router.post('/:id/comment/:commentId', auth, deletePostComment);
module.exports = router;
