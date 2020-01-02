let Goods = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

/*
  [정민]
  상품 필터링하기
  POST /goods/filter
  컬러는 하나, 카테고리랑 사이즈는 여러개
*/

exports.filter = async (req, res) => {
  const { color, category, size } = req.body;

  try {
    // console.log(color, category, size);
    let filterList = await Goods.find(
      { color: color,
        category: { $in: category },
        size: { $in: size }})
        .sort('createdAt')
        .select('_id goodsName img price')
        .limit(30);
    // console.log(filterList);

    if (filterList.length === 0){
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.DB_NO_MATCH_FILTER)
      });
    } else{
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ITEM_FILTERING_SUCCESS,filterList)
      });
    };
    
  } catch (err) {
    console.log(`Internal server error: ${err}`);
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ITEM_FILTERING_FAIL)
    });
  }
};
