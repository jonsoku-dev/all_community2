const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id).populate('category');
    req.product = product;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Product not found' });
  }
};

/**
 * sell / arrival
 * by sell = /product?sortBy=sold&order=desc&limit=4
 * by arrival = /product?sortBy=createdAt&order=desc&limit=4
 * if not params are sent, then all products are returned !
 */

exports.getProducts = async (req, res, next) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    const products = await Product.find()
      .select('-photo')
      .populate('category')
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Products not found' });
  }
};

/**
 * it will find the products based on the req product category
 * 카테고리 같은 것 (자신 제외)
 */

exports.getProductsRelated = async (req, res, next) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  try {
    const productsRelated = await Product.find({
      _id: { $ne: req.product },
      category: req.product.category,
    })
      .limit(limit)
      .populate('category', '_id name')
      .exec();
    res.json(productsRelated);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Products not found' });
  }
};

/**
 * distinct : 지정한 필드의 값들에서 중복을 제거한 후 가져온다.
 * 예를 들어 10명의 역할이 각각 user, user, admin, owner, admin, user, user, user, user, user....
 * 이라면 중복을 제거하여 ['user', 'owner', 'admin']이 된다.
 */

exports.getProductsCategories = async (req, res, next) => {
  try {
    const ProductCategories = await Product.distinct('category', {});
    res.json(ProductCategories);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ msg: 'Products not found' });
  }
};

exports.getProduct = (req, res, next) => {
  return res.json(req.product);
};

exports.getProductsBySearch = async (req, res, next) => {
  // const data = { limit, skip, filters }; 로 넘어온다.
  // 이걸 req.body.limit / req.body.skip / req.body.filters 로 받을 수있음!!! 오 쒯
  try {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    // findArgs = {} 오브젝트형식으로 안에 조건을 넣어서 ....
    let findArgs = {};
    // console.log(req.body.filters, 'req.body.filters');
    for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
        if (key === 'price') {
          // gte - greater than price [0-10]
          // lte - less than
          findArgs[key] = {
            // client에서 배열로만 ([0, 9])받은 이 숫자를 $gte , $lte로 다시 넣는 작업
            $gte: req.body.filters[key][0],
            $lte: req.body.filters[key][1],
          };
        } else {
          // category!!
          findArgs[key] = req.body.filters[key];
        }
      }
    }
    console.log(findArgs, 'findArgs');
    const products = await Product.find(findArgs)
      .populate('category')
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec();
    res.json({
      size: products.length,
      data: products,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};
/**
 * 검색 결과
 */
exports.getProductsSearch = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    if (req.query.category && req.query.category != 'All') {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category !
    const SearchedProducts = await Product.find(query);
    res.json({
      size: SearchedProducts.length,
      data: SearchedProducts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.createProduct = async (req, res, next) => {
  const { name, description, price, category, shipping, quantity } = req.body;
  const photo = req.file;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  if (!photo) {
    return res.status(404).json({ msg: '사진을 첨부해주세요. ' });
  }
  const photoUrl = photo.path;
  console.log(photoUrl);
  try {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      shipping,
      quantity,
      photo: photoUrl,
    });

    const product = await newProduct.save();

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let product = req.product;
    const deletedProduct = await product.remove();
    res.json({ deletedProduct, message: 'Product deleted successfully!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.putProduct = async (req, res, next) => {
  const { name, description, price, category, shipping, quantity } = req.body;
  const photo = req.file;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  if (!photo) {
    return res.status(404).json({ msg: '사진을 첨부해주세요. ' });
  }
  const photoUrl = photo.path;
  try {
    const product = await Product.findById(req.params.id);
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.shipping = shipping;
    product.quantity = quantity;
    product.photo = photoUrl;
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.getPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};
