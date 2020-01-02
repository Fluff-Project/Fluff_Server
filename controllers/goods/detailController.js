const mongoose = require('mongoose');
let Goods = require('../../models/Goods');
let User = require('../../models/User');
let ObjectId = require('mongodb').ObjectID;
const { au, sc, rm } = require('../../modules/utils');

/*
  상품 상세 페이지 조회
  GET /goods/:goodsId
*/
exports.goodsDetail = async (req, res) => {
  try {
    const { goodsId } = req.params;
    console.log(`goodId: ${goodsId}`);

    const goodsDetail = await Goods.findById(goodsId)
      .select('_id mainImg img size condition comment grade');
    console.log(`goodDetail: ${goodsDetail}`);

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
  판매자의 다른 상품 보기
  GET /goods/seller/:sellerId
*/
exports.sellerDetail = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const sellerGoods = await Goods.find()
      .where('seller').equals(sellerId)
      .sort('createAt')
      .select('_id goodsName mainImg prise')
      .limit(5);
    if (!sellerGoods) {
      console.log(`존재하지 않는 판매자 입니다.`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successTrue(rm.NO_X(`판매자의 다른 상품`), sellerGoods)
      });
    }

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ALREADY_X(`판매자의 다른 상품`), sellerGoods)
    });
    
  } catch (err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_FAIL(`판매자의 다른 상품`))
    });
  }
};

/*
  좋아요 여부 조회
  GET /goods/:goodsId/like
*/
exports.checkLike = async (req, res) => {
  try {
    const { goodsId } = req.params;
    
    const user = await User.findById(req.decoded._id)
      .where('like').in([{ _id: ObjectId(goodsId) }])
      .select('_id like');

    if (user) {
      console.log(`존재하는 좋아요 입니다.`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ALREADY_X(`좋아요`), { goodsId: user._id, like: true } )
      });
    }
    console.log(`존재하지 않는 좋아요 입니다.`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.NO_X(`좋아요`), { goodsId: user._id, like: true })
    });
  } catch (err) {
    console.log(`좋아요 여부 조회 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_FAIL(`좋아요 여부`))
    });
  }
};

/*
  좋아요 누르기/취소 (찜 기능)
  POST /goods/:goodsId/like
  {
    like: true or false
  }
*/
exports.useLike = async (req, res) => {
  try {
    const { goodsId } = req.params;
    const { like } = req.body;
    
    if (like) {
      let user = await User.findById(req.decoded._id);
      await user.updateOne({ $push: { like: ObjectId(goodsId) }}).where({ _id: req.decoded._id });
      
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.X_CREATE_SUCCESS(`좋아요 하기`), { goodsId, state: true })
      });
    }
    let user = await User.findById(req.decoded._id);
    let result = await user.updateOne({ $push: { like: ObjectId(goodsId) }}).where({ _id: req.decoded._id });

    console.log(`'좋아요 취소' 작성 성공`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.X_CREATE_SUCCESS(`좋아요 취소`), result.like)
    });

  } catch (err) {
    console.log(`좋아요 작성 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successTrue(rm.X_CREATE_FAIL(`좋아요`))
    });
  }
}