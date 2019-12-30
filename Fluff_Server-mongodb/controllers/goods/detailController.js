let Goods = require('../../models/Goods');
let User = require('../../models/User');

/*
  GET /goods/:goodsId
*/
exports.goodsDetail = async (req, res) => {
  try {
    const { goodsId } = req.params;
    const goodsDetail = await Goods.findById(goodsId)
      .select('mainImg img size condition comment grade');

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.X_READ_SUCCESS(`제품 디테일`), goodsDetail)
    });

  } catch (err) {
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.X_READ_FAIL(`제품 디테일`))
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
      .select('_id goodsName mainImg prise')
      .limit(5);
    if (!sellerGoods) {
      console.log('존재하지 않는 판매자 입니다.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successTrue(rm.NO_X('판매자의 다른 상품'), sellerGoods)
      });
    }

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ALREADY_X('판매자의 다른 상품'), sellerGoods)
    });
    
  } catch (err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_FAIL('판매자의 다른 상품'))
    });
  }
};

/*
  GET /goods/:goodsId/like
*/
exports.checkLike = async (req, res) => {
  try {
    const email = req.user.email;
    const goodsId = req.params.goodsId;

    const user = await User.findOne()
      .where('email').equals(email)
      .where('like').equals(goodsId);

    if (user) {
      console.log('존재하는 좋아요 입니다.');
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ALREADY_X('좋아요'), true)
      });
    }
    console.log('존재하지 않는 좋아요 입니다.');
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successTrue(rm.NO_X('좋아요'))
    });
  } catch (err) {
    console.log('좋아요 여부 조회 실패');
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_FAIL('좋아요 여부'))
    });
  }
} 

/*
  POST /goods/:goodsId/like
  {
    like: true or false
  }
*/
exports.useLike = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { goodsId } = req.params;
    const { like } = req.body;
    if (like) {
      user.like.remove({ likeGoods: goodsId })
      const result = user.update;

      console.log('`좋아요 하기` 작성 성공');
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.X_CREATE_SUCCESS('좋아요 하기'), result.like)
      });
    }
    console.log('`좋아요 취소` 작성 성공');
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.X_CREATE_SUCCESS('좋아요 취소'), result.like)
    });
  } catch (err) {
    console.log('좋아요 작성 실패');
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successTrue(rm.X_CREATE_FAIL('좋아요'))
    });
  }
}

/*
  GET /goods/likeCnt
*/
exports.likeCnt = async (req, res) => {
  try {
    const userLike = await User.findById(req.user._id).select('like')
    if (!userLike) {
      console.log(`필요한 값이 없습니다.`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successTrue(rm.NULL_VALUE)
      });
    }
    const result = {
      likeCnt: userLike.length,
    }
    console.log(`좋아요 개수 조회 성공`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.X_READ_SUCCESS(`좋아요`), result)
    });
  } catch (err) {
    console.log(`좋아요 개수 조회 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successTrue(rm.X_READ_FAIL(`좋아요`))
    });
  }
}









// // 좋아요정보 가져오기
// // 좋아요 하기, 취소하기
// /*
//   POST /goods/:goodsId/like
//   {
//     like: '윤자이짱'
//   }
// */
// exports.like = async (req, res) => {
//   try {
//     const user = User.find().where('email').equals(req.user.email);
//     const { goodsId } = req.params;
//     for (li in user.like) {
//       if (user.like[li].toString() === goodsId) {
//         user.like.remove(goodsId);
//         const result = await user.update();

//         console.log(`좋아요를 취소하였습니다.`);
//         res.json({
//           code: sc.OK,
//           json: au.successTrue(rm.LIKE_CANCEL_SUCCESS, false)
//         });
//       }
//     }
//     user.like.push(ObjectId(goodsId));
//     const result = await user.update();
//     console.log(`좋아요를 하였습니다.`);
//     res.json({
//       code: sc.OK,
//       json: au.successTrue(rm.LIKE_APROVE_SUCCESS, true)
//     });
//   } catch (err) {
//     console.log(`좋아요 기능 에러 발생!`);
//     res.json({
//       code: sc.INTERNAL_SERVER_ERROR,
//       json: au.successFalse(rm.LIKE_INTERNAL_ERROR)
//     });
//   }
// }