let { Goods, User } = require('../../models');

const { au, sc, rm } = require('../../modules/utils');

/* 
  카테고리 별 리스트
  GET /goods?category={category}&page={7}
*/
exports.category = async (req, res) => {
  const { category, page } = req.query;
  console.log(`${category} 상품을 ${page}만큼 받아옵니다.`);

  try {
    const goods = await Goods.find()
      .where('category').equals(category)
      .select('goodsName, img, sellerName, price, _id')
      .limit(Number(page));

    if (!goods) {
      console.log(`${category} 리스트 조회 실패`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`${category} 리스트 조회 실패`)
      });
    }

    goods.img = img[0]

    // push like statement in goods element
    for (it of goods) {
      let userLike = await User.findById(req.decoded._id).select('like');
      if (userLike.indexOf({ _id: goods[it]._id })) {
        goods[it].like = true
      } else {
        goods[it].like = false
      }
    }

    // success and return to client
    console.log(`${category} 리스트 ${page}개 조회`);
    res.json({
      code: sc.OK,
      json: au.successTrue(`${category} 리스트 ${page}개 조회`, goods)
    });

  } catch (err) {
    console.log(`[서버 내부 오류]`);
    console.log(`Error Code: ${err}`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
};