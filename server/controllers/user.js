const User = require('../models/User');

exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });
  try {
    const result = await newUser.save();
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
};
