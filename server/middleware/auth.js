const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    //* findById에 들어올 것이 앞으로의 TO DO
    //* 로그인하면 로컬스토리지에 TOKEN을 올리고, 그 TOKEN으로 아이디를 검색하는 시스템
    //* 이부분을 다시한번 공부해보자!
    const user = await User.findById('5d9687ddfe525a2cc082f283').select('_id');
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(401)
      .send({ dev_error: 'auth middleware를 확인해주세요. ', err: '회원인증에러입니다.' });
  }
};

module.exports = auth;
