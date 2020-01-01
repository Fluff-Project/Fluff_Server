/* 
*   PUT| shopper/toSeller  셀러로 전환 
*/

let User = require("../../models/User");

const { au,sc,rm } = require('../../modules/utils');

exports.toSeller = async (req, res) => {
  let id = req.decoded._id;
  let file = req.file;
  let sellerName = req.decoded.username;

  console.log(`sellerId : ${ sellerId }`);
  try {

    let image = file.location;
    console.log(`확인: ${image}`);



    let seller = await User.findOneAndUpdate({ _id: id }, { 
   //   $push: {saleList:{ saleList}},
      $set: {sellerAuth: true, sellerImg:image, sellerName:sellerName }
    })
    seller.save();
    console.log(seller);
    console.log(`goods!!!!!!!!!!!! :${goods}`);



  //  let show = await User.find({_id: sellerId}).select("_id sellerAuth sellerImg sellerId");
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
        json: au.successTrue(rm.CHANGE_TO_SELLER_SUCCESS, seller)
      });

    }catch (err) {
      console.log(`셀러 전환 실패: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.CHANGE_TO_SELLER_FAIL)
      });
  }
};
