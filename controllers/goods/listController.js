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

  try {
    let goods = null;
    if (category) {
      goods = await Goods.find()
        .where('category').equals(category)
        .select('img goodsName sellerName sellerId price _id')
        .limit(Number(page));

      console.log(goods);
      
    };
    if (sort === 'newest') {
      goods = await Goods.find()
        .sort('createAt')
        .select('img goodsName sellerName sellerId price _id')
        .limit(Number(page))
    }

    if (!goods) {
      console.log(`${category} 리스트 조회 실패`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`${category} 리스트 조회 실패`)
      });
    };

    const userLike = await User.findById(req.decoded._id).select('like -_id');
    let like = userLike.like;

    let result = [];
    for (good of goods) {

      let isExist = (like.indexOf(good._id)!== -1)
      let obj = {
        img: good.img,
        price: good.price,
        _id: good._id.toString(),
        goodsName: good.goodsName,
        sellerName: good.sellerName,
        sellerId: good.sellerId
      }

      if (isExist) obj.like = true;
      else obj.like = false;

      result.push(obj)
    }

    // success and return to client
    console.log(`${category} 리스트 ${page}개 조회`);
    res.json({
      code: sc.OK,
      json: au.successTrue(`${category} 리스트 ${page}개 조회`, result)
    });

  } catch (err) {
    console.log(`[서버 내부 오류]`);
    console.log(`Error Code: ${err}`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  };
};