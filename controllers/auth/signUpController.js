const nodemailer = require('nodemailer');
const jwt = require('../../modules/auth/jwt');

let { User } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');

BASE_URI = process.env.BASE_URI;

/* 
  이메일 중복 체크
  POST /auth/checkEmail
  {
    email
  }
*/
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const savedUser = await User.findOne().where('email').equals(email).select()
    if (savedUser) {
      console.log(`${email}는 이미 회원가입한 email입니다.`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.DB_DUPLICATE_ENTRY_ERROR, { email, duplication: true })
      }); // rm is not an error here.
    }
    console.log(`${email}는 회원가입 가능한 email입니다.`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.DB_NOT_MATCHED_ERROR, { email, duplication: false })
      });
  } catch (err) {
    console.log(`email 중복 조회를 실패하였습니다.`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.DB_ERROR)
    });
  }
}

/*
  이메일 인증 없이 바로 가입
  POST /auth/directSignUp
  {
    email,
    username,
    pwd,
    gender
  }
*/
exports.directSignUp = async (req, res) => {
  try {
    const { username, email, pwd, gender } = req.body;  // { username, pwd, email, gender }

    let user = new User({ username, pwd, email, gender });
    const result = await user.save();
    if (result) {
      console.log(`Database에 저장하는 중 error가 발생했습니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successTrue(rm.DB_ERROR, result)
      });
    }

    
    console.log(`${email} 회원가입 성공`);
    res.json({
      code: sc.OK,
      json: au.successTrue(X_CREATE_SUCCESS(`signUp`), result)
    });
  } catch (err) {
    console.log(`Internal 데이터 베이스 저장`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successTrue(rm.INTERNAL_SERVER_ERROR, result)
    });
  }


}



// This is optional ---------------------------------------------
/* 
  POST /auth/signUp
  {
    email,
    username,
    pwd,
    gender
  }
*/
exports.signUp = async (req, res) => {
  const { username, email, pwd, gender } = req.body;  // { username, pwd, email, gender }
  const user = { username, pwd, email, gender };

  const checkExist = async (user) => {
    const savedUser = await User.findOne().where('email').equals(user.email);
    if (savedUser) {
      throw new Error('User가 존재합니다!');
    }
    return user;
  };
  
  // 가데이터 저장
  const storeCache = async (user) => {
    try {      
      console.log(`debug1: ${user.email}`);
      req.cache.hmset(user.email, "username", user.username, "email", user.email, "pwd", user.pwd, "gender", user.gender);
    } catch (err) {
      console.log('Redis store error!!!');
      console.log(`Error logs: ${err}`);
    }
    return user;
  };
  
  // 인증 이메일 전송
  const sendEmail = async (user) => {
    if (!user.username || !user.email) {
      return {
        code: sc.BAD_REQUEST, // Bad request
        json: au.successFalse(rm.WAIT_EMAIL_AUTHORIZATION)
      };
    }
    
    // tranceporter initialization
    const tranceporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_EMAIL_PWD
      }
    });
  
    const token = await jwt.sign({ 
      username: user.username,
      email: user.email,
      _id: 'sdfdsfaddfe',
    });
    
    console.log(`token: ${token.token}`);
    
    const html = `<p>아래의 링크를 클릭해주세요!</p> <a href='${BASE_URI}/auth/emailAuth?email=${user.email}&token=${token.token}'>인증하기</a>`;

    const mailOptions = {
      from: process.env.HOST_EMAIL,
      to: user.email,
      subject: 'sending test',
      html: html
    };
  
    tranceporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      }
      console.log(`Email Send: ${info.response}`);
    })
    return {
      message: 'Send mail'
    };
  };
  
  // error occured
  const onError = (error) => {
    console.log(`Login Error: ${error}`);
    return {
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.LOGIN_FAIL)
    };
  }

  const result = await checkExist(user)
  .then(storeCache)
  .then(sendEmail)
  .catch(onError)
  
  res.json({
    code: sc.OK,
    json: au.successTrue(rm.MAIL_SUCCESS, result)
  });
};

// JOIN SERVE LOGIC
exports.emailAuth = async (req, res) => {
  const { email, token } = req.query;
  try {
    const check = jwt.verify(token);
    if (check) {
      let result = null;
      await req.cache.hgetall(email, async (err, obj) => {
        console.log(`**Debug: Email: ${obj.email}, username: ${obj.username} `);
        console.log(`redis -> mongodb save 전`);
        
        let user = new User(obj);
        result = await user.save();

        if (err) {  // catch error
          console.log(`cache memory -> Database store중 error 발생!`);
          res.json({
            code: sc.INTERNAL_SERVER_ERROR,
            json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
          })
        }
      });

      res.json({
        code: sc.OK,
        json: au.successTrue(rm.SIGNUP_SUCCESS, result)
      })
    }
  } catch (err) {
    console.log(`Error: Email 인증하기 에러 ${err}`);
  }
}



