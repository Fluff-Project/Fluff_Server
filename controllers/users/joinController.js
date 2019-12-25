const nodemailer = require('nodemailer');
const jwt = require('../../modules/auth/jwt');

const { User } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');

BASE_URI = '15.164.47.5:3000'

/* 
  POST /users/join
  {
    email,
    username,
    pwd,
    gender
  }
*/
exports.join = async (req, res) => {
  const user = req.body;  // { username, pwd, email, gender }
  const checkExist = async (user) => {
    const savedUser = await User.findOne({ where: { email: user.email } });
    if (savedUser) {
      throw new Error('User가 존재합니다!');
    }
    return user;
  };
  
  // 가데이터 저장
  const storeCache = async (user) => {
    try {      
      client.hmset(user.email, "username", user.username, "email", user.email, "pwd", user.pwd, "gender", user.gender);
    } catch (err) {
      console.log('Redis store error!!!');
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
  
    const token = await jwt.sign(user.username, user.email);
    
    const html = 
    `<p>아래의 링크를 클릭해주세요!</p>
    <a href='${BASE_URI}/users/emailAuthorization?email="${user.email}&token=${token.token}'>인증하기</a>`;
  
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
    json: au.successTrue(rm.SIGNUP_SUCCESS, result)
  });
};

// JOIN SERVE LOGIC
exports.emailAuthorization = async (req, res) => {
  const { email, token } = req.query;
  try {
    const check = jwt.verify(token);
    if (check) {
      let result = null;
      await client.hgetall(email, async (err, obj) => {
        result = await User.create({
          username: obj.username,
          email: obj.email,
          pwd: obj.pwd,
          gender: obj.gender
        });
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


