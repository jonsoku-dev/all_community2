const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
    }
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      password: bcryptPassword,
    });

    await newUser.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
};
