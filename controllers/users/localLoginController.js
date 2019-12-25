const { User } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');
const jwt = require('../../modules/auth/jwt');

/* 
  POST /users/join
  {
    email,
    pwd
  }
*/
exports.login = async (req, res) => {
  const { email, pwd } = req.body;

  // verify
  const verify =  async (user) => {
    const savedUser = await User.findOne({ where: { email: user.email }});
    if (!savedUser) {
      console.log('가입되지 않은 사용자입니다.');
      return {
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.EXIST_USER_ERROR)
      };
    }

    if (user.pwd === avedUser.pwd) {
      return savedUser;
    }
    // err
    console.log('비밀번호가 일치하지 않습니다.');
    throw new Error(`비밀번호가 일치하지 않습니다.`);

    //   throw new Error(`비밀번호가 일치하지 않습니다.`);
    // const result = await bcrypt.compare(user.pwd, savedUser.pwd);
    // if (!result) {
    //   console.log('비밀번호가 일치하지 않습니다.');
    //   throw new Error(`비밀번호가 일치하지 않습니다.`);
    // }
    // Success End Point
    return savedUser;
      
  }

  const createToken = async (user) => {
    try {
      return await jwt.sign(user);
      
    } catch (err) {
      console.log(`Login 후 Token 발행 중 Error 발생!!!: ${err}`);
      throw new Error(`Login 후 Token 발행 중 Error 발생!!!`);
    }
  };

  // error occured
  const onError = (error) => {
    console.log(`Login Error: ${error}`);
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.MISS_MATCH_PW)
    });
  }

  const token = await verify({ email, pwd })
    .then(createToken)
    .catch(onError)
  
  res.json({
    code: sc.OK,
    json: au.successTrue(rm.LOGIN_SUCCESS, token)
  });
}