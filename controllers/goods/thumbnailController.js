let Goods = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

/*
  상품 썸네일 사진 조회해서 보내주기
  GET /goods/thumbnail
*/
exports.thumbnail = async (req, res) => {
  try {
    const thumbnail = 
      await Goods.find()
        .sort('createAt')
        .select('goodsName sellerName img price _id ')
        .limit(30);
    
    console.log(`제품 리스트를 성공적으로 load하였습니다!`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_LIST_SUCCESS, thumbnail)
    });
    
  } catch (err) {
    console.log(`제품 리스트를 load를 실패하였습니다.!`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.ITEM_LIST_FAIL)
    });
  }
};