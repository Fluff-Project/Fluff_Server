/** 상품등록
 * POST | management/registration
*/
const { management } = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

exports.register = async (req, res) => {
  const { name, seller, comment, color, category, mainImg, 
    img, price, grade, size, condition, style, createdAt} = req.body;

  try{
    const register = await management.insert({
      goodsName: name,
      sellerName: seller,
      comment: comment,
      color: color,
      category: category,
      mainImg: mainImg,
      img: img,
      price: price,
      grade: grade,
      size: size,
      condition: condition,
      style: style,
      createdAt: createdAt
    });
    console.log("success!");

    res.json({
      code: sc.CREATED,
      json: au.successTrue(rm.ITEM_INSERT_SUCCESS, register)
    });
  } catch(err){
      console.log(`item register failed error: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_INSERT_FAIL)
      });
  }
}