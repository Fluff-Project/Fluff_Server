/** 셀러로 전환하기 
 *  PUT | shopper/toSeller
*/
let User = require('../../models/User');
const { au, sc, rm } = require('../../modules/utils');

exports.toSeller = async (req, res) => {

  try{
    const { sellerEmail } = req.decoded.email;

    const seller = await User
                    .update({ email: sellerEmail },{ $set: {seller: true} });
  

    if(!email){
      console.log(`${email} : 해당 이메일은 등록이 안된 계정입니다.`); 
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.UNAUTHORIZED)
      });
    }
    console.log(seller); 

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.CHANGE_TO_SELLER_SUCCESS, seller)
    });
  } catch(err){
      console.log(`change to seller failed error: ${err}`);
      res.json({
        code: sc.UNAUTHORIZED,
        json: au.successFalse(rm.CHANGE_TO_SELLER_FAIL)
      });
    }
}
