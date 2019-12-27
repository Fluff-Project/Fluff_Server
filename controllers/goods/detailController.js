let Goods = require('../../models/Goods');
let User = require('../../models/User');

/*
  GET /goods/:goodsId
*/
exports.goodsDetail = async (req, res) => {
  try {
    const { goodsId } = req.params;
    const goodsDetail = await Goods.findOne()
      .where('_ObjectId').equals(goodsId)
      .select('mainImg img size condition comment grade');

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_DETAIL_SUCCESS, goodsDetail)
    });

  } catch (err) {
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ITEM_DETAIL_FAIL)
    });
  }
};

/*
  GET /goods/:sellerId
*/
exports.sellerDetail = async (req, res) => {

  try {
    const { sellerId } = req.params;
    const sellerGoods = await Item.find()
      .sort('createAt')
      .select('_ObjectId goodsName mainImg prise')
      .limit(5);

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_DETAIL_SUCCESS, sellerGoods)
    });
    
  } catch (err) {
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ITEM_DETAIL_FAIL)
    });
  }
};

/*
  POST /goods/:goodsId/like
  {
    like: '윤자이짱'
  }
*/
exports.like = async (req, res) => {
  try {
    const user = User.find().where('email').equals(req.user.email);
    const { goodsId } = req.params;
    for (li in user.like) {
      if (user.like[li].toString() === goodsId) {
        user.like.remove(goodsId);
        const result = await user.update();

        console.log(`좋아요를 취소하였습니다.`);
        res.json({
          code: sc.OK,
          json: au.successTrue(rm.LIKE_CANCEL_SUCCESS, result)
        });
      }
    }
    user.like.push(ObjectId(goodsId));
    const result = await user.update();
    console.log(`좋아요를 하였습니다.`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.LIKE_APROVE_SUCCESS, result)
    });
  } catch (err) {
    console.log(`좋아요 기능 에러 발생!`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.LIKE_INTERNAL_ERROR)
    });
  }
}