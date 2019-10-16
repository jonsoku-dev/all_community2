const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const ADMIN_ID_1 = process.env.ADMIN_ID_1;

const admin = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: '토큰이 존재하지 않습니다. ' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const adminUser = decoded.user.id;
    if (adminUser !== ADMIN_ID_1) {
      return res.status(401).json({ msg: '일반 유저입니다. 권한이 없습니다.' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: '토큰관련 에러가 발생하였습니다. ' });
  }
};

module.exports = admin;

// role을 활용하여 자유자재로 어드민계정을 만드는 방법을 구상해야한다.
// 지금의 방식은 직접적으로 env에 어드민계정id를 넣어서 권한을 부여하는방식인데
// 매우귀찮다...

// 회원가입할때 선택? -> 이건 일반사용자가 잘못 등록할 수도 있기때문에.. ...
// 관리자 회원가입페이지를 따로 작성? -> 귀찮다....
