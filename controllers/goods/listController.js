let { Goods, User } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');

/**
 * @author ooeunz
 * @see GET /goods?category=category&page=7
 * @see GET /goods?sort=newest&page=7
 */
exports.category = async (req, res) => {
  const { category, page, sort } = req.query;
  console.log(`${category} 상품을 ${page}만큼 받아옵니다.`);
  console.log('123213123123');
  
  

  try {
    let goods = null;
    if (category) {
      goods = await Goods.find()
        .where('category').equals(category)
        // .select('img goodsName, sellerName, price, _id')
        .limit(Number(page));
    }
    if (sort) {
      goods = await Goods.find()
        // .select('goodsName, img, sellerName, price, _id')
        .sort('createAt')
        .limit(Number(page))
    }

    if (!goods) {
      console.log(`${category} 리스트 조회 실패`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`${category} 리스트 조회 실패`)
      });
    }

    // push like statement in goods element
    let result = [];
    for (idx of goods) {
      let userLike = await (await User.findById(req.decoded._id)).isSelected('like');
      console.log(userLike);
      

      let product = {
        goodsName: goods[idx].goodsName,
        mainImg: goods[idx].img[0],
        sellerName: goods[idx].sellerName,
        price: goods[idx].price,
        _id: goods[idx]._id,
      }

      if (userLike.indexOf({ _id: goods[idx]._id })) {
        product.like = true;
        result.push(product);

      } else {
        product.like = false;
        result.push(product);
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