const express = require('express');
const router = express.Router();
const admin = require('../../../middleware/admin');
const { check } = require('express-validator');
const {
  categoryById,
  getCategories,
  getCategory,
  createCategory,
  putCategory,
  deleteCategory,
} = require('../../../controllers/category');

router.post(
  '/',
  [
    admin,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  createCategory,
);
router.get('/', getCategories);
router.get('/:categoryId', getCategory);
router.put('/:categoryId', admin, putCategory);
router.delete('/:categoryId', admin, deleteCategory);

router.param('categoryId', categoryById);

module.exports = router;
