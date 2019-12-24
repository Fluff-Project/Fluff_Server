const { User } = require('../../models');
const jwt = require('../../modules/auth/jwt');
const bcrypt = require('bcrypt');
const { au, sc, rm } = require('../../modules/utils');

const verify =  async (user) => {
  try {
    const savedUser = await User.findOne({ where: { email: user.email }});
    if (!savedUser) {
      console.log('가입되지 않은 사용자입니다.');
      return {
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.EXIST_USER_ERROR)
      };
    }

    const result = await bcrypt.compare(user.password, savedUser.password);
    if (!result) {
      console.log('비밀번호가 일치하지 않습니다.');
      throw {
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.MISS_MATCH_PW)
      };
    }
    // Success End Point
    return savedUser;
    
  } catch (err) {
    console.log(`LoginError: 로그인 중 Error 발생!!! code: ${err}`);
    return {
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    };
  }
}

const createToken = async (user) => {
  try {
    return await jwt.sign(user);
    
  } catch (err) {
    console.log(`Login 후 Token 발행 중 Error 발생!!!: ${err}`);
    return {
      code: 400,
      message: `Login 후 Token 발행 중 Error 발생!!!: ${err}`
    }
  }
};

const login = async (req, res) => {
  const {email, password} = req.body;
  const token = await verify({ email, password })
    .then(createToken)
    .catch(onError)
  
  res.json({
    code: sc.OK,
    json: au.successTrue(rm.LOGIN_SUCCESS, result)
  });
}

module.exports = {
  login: login,

}