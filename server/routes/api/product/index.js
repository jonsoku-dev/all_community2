const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const admin = require('../../../middleware/admin');
const {
  productById,
  getProducts,
  getProductsRelated,
  getProductsCategories,
  getProduct,
  createProduct,
  deleteProduct,
  putProduct,
  getProductsBySearch,
  getPhoto,
  getProductsSearch,
} = require('../../../controllers/product');

router.get('/', getProducts);
router.get('/:productId', getProduct);
router.get('/categories', getProductsCategories);
router.get('/related/:productId', getProductsRelated);
router.get('/photo/:productId', getPhoto);

router.post(
  '/',
  [
    admin,
    [
      check('name', 'name is required')
        .not()
        .isEmpty(),
      check('description', 'name is required')
        .not()
        .isEmpty(),
      check('price', 'price is required')
        .not()
        .isEmpty(),
      check('category', 'category is required')
        .not()
        .isEmpty(),
    ],
  ],
  createProduct,
);
router.post('/search', getProductsSearch);
router.post('/by/search', getProductsBySearch);
router.put(
  '/:productId',
  [
    admin,
    [
      check('name', 'name is required')
        .not()
        .isEmpty(),
      check('description', 'name is required')
        .not()
        .isEmpty(),
      check('price', 'price is required')
        .not()
        .isEmpty(),
      check('category', 'category is required')
        .not()
        .isEmpty(),
    ],
  ],
  putProduct,
);

router.delete('/:productId', admin, deleteProduct);

router.param('productId', productById);

module.exports = router;
