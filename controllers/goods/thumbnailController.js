const Goods = require('../../models/goods');

/*
  GET /goods/thumbnail
*/
exports.thumbnail = async (req, res) => {
  try {
    const thumbnail = 
      await Goods.find()
        .sort('createAt')
        .select('goodsName mainImg prise')
        .limit(30);
    
    console.log(`제품 리스트를 성공적으로 load하였습니다!`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_LIST_SUCESS, thumbnail)
    });
    
  } catch (err) {
    console.log(`제품 리스트를 load를 실패하였습니다.!`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.ITEM_LIST_FAIL)
    });
  }
};