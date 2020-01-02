/* 
*   POST| shopper/toSeller  셀러로 전환 
*/
let User = require("../../models/User");
const { au,sc,rm } = require('../../modules/utils');

exports.toSeller = async (req, res) => {

  let file = req.file;
  let id = req.decoded._id;

  try {

    let image = file.location;
    console.log(`확인: ${image}`);

    let seller = await User.findOneAndUpdate({ _id: id }, { 
      $set: {sellerAuth: true, sellerImg:image }
    })

    let show = await User.find({_id: id}).select("_id sellerAuth sellerImg");
    console.log(show);

    if(!seller){
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.SELLER_DOES_NOT_EXIST)
      })
    }    
      console.log('셀러 전환 성공');
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.CHANGE_TO_SELLER_SUCCESS, show)
      });

    }catch (err) {
      console.log(`셀러 전환 실패: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.CHANGE_TO_SELLER_FAIL)
      });
  }
};
