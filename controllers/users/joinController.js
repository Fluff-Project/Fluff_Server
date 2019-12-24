const { User } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');

BASE_URI = 'http://localhost:3000'

/* 
  POST /users/join
  {
    email,
    username,
    password
  }
*/
const checkExist = async (user) => {
  const savedUser = await User.findOne({ where: { email: user.email } });
  if (savedUser) {
    throw new Error('user exists');
  }
  return user;
};

// 가데이터 저장
const storeCache = (user) => {
  try {
    client.hmset(user.email, "username", user.username, "email", user.email, "password", user.password);
  } catch (err) {
    console.log('Redis store error!!!');
  }
  return user;
};

// 인증 이메일 전송
const sendEmail = (user) => {
  if (!user.username || !user.email) {
    return {
      code: 400, // Bad request
      message: 'username 또는 email이 없음.'
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

  const token = jwt.sign(user.username, user.email);
  const html = 
  `<p>아래의 링크를 클릭해주세요!</p>
  <a href='${BASE_URI}/api/auth/emailAuthorization?email="${user.email}&token=${token.token}'>인증하기</a>`;

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
    code: 200,
    message: 'Send mail'
  };
};

const join = (req, res) => {
  const user = req.body;  // { email, username, password }

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
const emailAuthorization = async (req, res) => {
  const { email, token } = req.query;
  try {
    const check = jwt.verify(token);
    if (check) {
      client.hgetall(email, (err, obj) => {
        const result = await User.create({
          username: obj.username,
          email: obj.email,
          password: obj.password
        })
      });
      res.send({
        code: sc.OK,
        json: au.successTrue(rm.SIGNUP_SUCCESS, result)
      })
    }
  } catch (err) {
    console.log(`Error: Email 인증하기 에러 / ${err}`);
  }
}

module.exports = {
  join: join,
  emailAuthorization: emailAuthorization,
}

