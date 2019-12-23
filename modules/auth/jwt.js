const randToken = require('rand-token');
const jwt = require('jsonwebtoken');

const options = {
  algorithm: 'HS256',
  expiresIn: '1h',
  issuer: 'ooeunz'
};

module.exports = {
  sign: async (user) => {
    const payload = {
      username: user.username,
      email: user.email
    };

    let token = null;
    try {
      await jwt.sign(payload, process.env.JWT_SECRET, options, (err, newToken) => {
        token = newToken;
      });
      return token;
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