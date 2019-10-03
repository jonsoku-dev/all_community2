const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const user = await User.findById('5d9687ddfe525a2cc082f283').select('_id');
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ dev_error: 'admin middleware를 확인해주세요. ', err: 'admin 회원인증에러입니다.' });
  }
};

module.exports = auth;
