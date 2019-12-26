let Goods = require('../../models/Goods');

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
      json: au.successTrue(rm.ITEM_DETAIL_SUCESS, goodsDetail)
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
      json: au.successTrue(rm.ITEM_DETAIL_SUCESS, sellerGoods)
    });
    
  } catch (err) {
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ITEM_DETAIL_FAIL)
    });
  }
};