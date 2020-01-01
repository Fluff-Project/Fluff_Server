let { User } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');
const jwt = require('../../modules/auth/jwt');

/* 
  POST /auth/localLogin
  {
    email,
    pwd
  }
*/
exports.login = async (req, res) => {
  const { email, pwd } = req.body;
  
  // verify
  const verify =  async (user) => {
    const savedUser = await User.findOne().where('email').equals(user.email);
    if (!savedUser) {
      console.log('가입되지 않은 사용자입니다.');
      throw new Error(`가입되지 않은 사용자입니다.`);
    }

    // err
    if (user.pwd != savedUser.pwd) {
      console.log('비밀번호가 일치하지 않습니다.');
      res.json({
        code: BAD_REQUEST,
        json: au.successFalse(`비밀번호가 일치하지 않습니다.`)
      })
      throw new Error(`비밀번호가 일치하지 않습니다.`);
    }
    return savedUser;
  }

  const createToken = async (user) => {
    try {
      if(!user.hasOwnProperty('style')) {
        console.log(`${user.username}의 취향분석이 존재하지 않음.`);
        let token = await jwt.sign(user);
        token.style = false;
        
        return token;
      }
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
      json: au.successFalse(error)
    });
  }

  const token = await verify({ email, pwd })
    .then(createToken)
    .catch(onError)
  
  res.json({
    code: sc.OK,
    json: au.successTrue(rm.LOGIN_SUCCESS, token),
  });
}