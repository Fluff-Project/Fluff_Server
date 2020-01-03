const { User, Goods } = require('../../models');
const { sc, au, rm } = require('../../modules/utils');

/**
 * @author ooeunz
 * @see GET /recommend/seller?page{7}
 * 
 * @param page $페이징
 */
exports.sellerRec = async (req, res) => {
  const { page } = req.query;

  try {
    const seller = await User.find()
      .where('sellerAuth').equals(true)
      .where('sellerImg').exists(true)
      .select('sellerImg saleList username _id')
      .limit(Number(page));

    if (!seller) {
      console.log(`판매자를 찾지 못했습니다.`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.BAD_REQUEST)
      });
    }

    let result = []
    let count = 0;
    for (let idx in seller) {
      if (count >= 7) break;

      let goods = await Goods.findOne()
        .where('sellerId').equals(seller[idx]._id)
        .select('img'); 

      let obj = {
        sellerId: seller[idx]._id,
        sellerName: seller[idx].username,
        sellerImg: seller[idx].sellerImg,
        img: goods.img
      }

      result.push(obj);
      count++;
    }

    console.log(`@@ RESULT`);
    console.log(result);

    console.log(`내가 좋아할 만한 seller list 조회 성공`);
    res.json({
      code: sc.OK,
      json: au.successTrue(`내가 좋아할 만한 seller list 조회 성공`, result)
    });

  } catch (err) {
    console.log(`[좋아할 만한 seller 추천] 서버 내부 오류`);
    console.log(`Error Code: ${err}`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
}