const contentRecommend = require('../../modules/recommend/contentRecommend');
const { Goods } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');

/**
 * @author ooeunz
 * @see GET /recommend/style?page={7}
 * 
 * @param page $페이징
 */
exports.styleRec = async (req, res) => {
  
  const { page } = req.query;

  try {
    const recList = await contentRecommend(req.decoded, page);
    console.log(`@@@ ${req.username}님의 추천 목록`);
    console.log(recList);

    // find Goods
    let result = [];
    for (let idx in recList) {
      let goods = await Goods.findById(recList[idx].id)
        .select('goodsName img sellerName price _id');
      
      const convertGoods = {
        goodsName: goods.goodsName,
        mainImg: goods.img[0],
        sellerName: goods.sellerName,
        price: goods.price,
        _id: goods._id
      }

      result.push(convertGoods)
    }

    console.log('스타일 추천 success');
    res.json({
      code: sc.OK,
      json: au.successTrue('스타일 추천 success', result)
    });
  } catch (err) {
    console.log('스타일 추천 fail');
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
}