/** 상품수정
 * PUT | management/update
 */
const { management } = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

exports.update = async (req, res) => {
  const { name, seller, comment, color, category, mainImg, 
    img, price, grade, size, condition, style, createdAt} = req.body;

try{
  const update = await management.update({
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
  console.log("update success!");

  res.json({
    code: sc.OK,
    json: au.successTrue(rm.ITEM_UPDATE_SUCCESS, update)
  });
} catch(err){
    console.log(`item update failed error: ${err}`);
    res.json({
      code: sc.DB_ERROR,
      json: au.successFalse(rm.ITEM_UPDATE_FAIL)
    });
  }
}