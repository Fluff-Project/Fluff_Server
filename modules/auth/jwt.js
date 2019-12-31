const randToken = require('rand-token');
const jwt = require('jsonwebtoken');

const options = {
  algorithm: 'HS256',
  expiresIn: '24h',
  issuer: 'ooeunz'
};

module.exports = {
  sign: async (user) => {
    const payload = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    try {
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      return {
        token: token,
        refreshToken: randToken.uid(256)
      }
    } catch (err) {
      console.log(`Token sign Error!!!: ${err}`);
    }
  },

  verify: (token) => { 
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return -3;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        return -2; 
      } else {
        console.log("invalid token");
        return -2; 
      }
    }
    return decoded; 
  },

  refresh: (user) => { 
    const payload = {
      username: user.username,
      email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options); 
  }
};

