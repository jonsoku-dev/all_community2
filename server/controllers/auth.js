const User = require('../models/User');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.loadUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
};

exports.loginAuth = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // 1. 유저 확인
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ errors: [{ msg: '유저 정보가 존재하지 않습니다. ' }] });
    }
    // 2. 패스워드 검증
    // password : 입력받은 Password
    // user.password : 암호화되어서 저장되어있다.
    // bcrypt.compare() : user.password를 해독해서 password와 일치하는지 확인
    // 현재 user.password 에는 bcryptjs로 암호화 된 password가 들어있기 때문에 !
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ errors: [{ msg: '패스워드가 일치하지 않습니다.' }] });
    }

    // 3. token 리턴
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.status(201).json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error!');
  }
};
