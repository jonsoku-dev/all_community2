const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(404).json({ msg: 'Category is not found' });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const category = new Category(req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find()
      .collation({ locale: 'en' })
      .sort('name');
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.getCategory = (req, res, next) => {
  return res.json(req.category);
};

exports.putCategory = (req, res, next) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(404).json({ msg: 'category is not found' });
    }
    res.json(data);
  });
};

exports.deleteCategory = (req, res, next) => {
  const category = req.category;
  category.name = req.body.name;
  category.remove((err, data) => {
    if (err) {
      return res.status(404).json({ msg: 'category is not found' });
    }
    res.json({
      message: 'category deleted!',
    });
  });
};
