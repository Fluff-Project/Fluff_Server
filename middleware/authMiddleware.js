const jwt = require('../modules/auth/jwt');
const { sc, au, rm } = require('../modules/utils');

module.exports = async (req, res, next) => {
    // read the token from header or url 
    const token = req.headers['x-access-token'] || req.query.token;
    console.log(token);
    
    // token does not exist
    if(!token) {
      res.json({
          code: sc.BAD_REQUEST,
          json: au.successFalse(rm.NO_TOKEN)
      });
    }

    try {
      const decoded = await jwt.verify(token);
      req.decoded = decoded;
      next();
      
    } catch (err) {
      console.log(`Token decoded 에러발생!!!`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.INVALID_TOKEN)
      });
    }
}