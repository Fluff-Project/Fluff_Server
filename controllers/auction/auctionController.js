let { Auction } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');

/* 
  POST auction
  {
    auctionNmae: "경매 상품 이름",
    mainImg: "메인 이미지",
    img: ["이미지", "리스트"]

    color: "상품 색상",
    category: "상품 카테고리",
    hashtag: "상품 해시태그",
    size: "사이즈",

    startCost: "시작 가격",
    comment: "판매자 한줄 평",
    condition: "상품 상태",
    style: "스타일",
  }
*/
exports.regist = async (req, res) => {  // img는 multer로
  try {
    const { auctionNmae, img, color, category, hashtag, size, startCost, comment, condition, style } = req.body;
    const auction = new Auction({ auctionNmae, img, color, category, hashtag, size, startCost, comment, condition, style });
    auction.save();
    console.log(`경매 등록완료`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.X_CREATE_SUCCESS(`경매`), auction)
    })
    
  } catch (err) {
    console.log(`경매 등록실패`);
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successTrue(rm.X_CREATE_FAIL(`경매`), auction)
    });
  }
};

/* 
  POST auction/auth
  {
    auth: true or false
  }
*/
exports.authorize = async (req, res) => {
  const { auth } = req.body;
  const { id } = req.params;
  const auction = Auction.findById(id);

  try {
    if (auth) {
      auction.authorize = true;
      const result = await auction.update();
      console.log(`경매 상품을 인가하였습니다.`);
      res.json({
        code: sc.OK,
        json: au.successTrue(`경매 상품이 인가되었습니다.`, result)
      });
    }
    const result = await auction.delete();
    console.log(`경매물품이 거부되었습니다.`);
    res.json({
      code: sc.OK,
      json: au.successTrue(`경매 상품이 거부되었습니다.`, result)
    });
  } catch (err) {
    console.log(`경매 상품 인가 중 에러가 발생했습니다.`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR, result)
    });
  }
};

/* 
  GET auction?sort={정렬방식}
*/
exports.auctionList = async (req, res) => {
  try {
    const { sort } = req.query;
    let result;
    if (sort === deadline) {
      result = await Auction.find().where('saleAuth').equals(true).sort(createdAt);
    } else {
      result = await Auction.find().where('saleAuth').equals(true);
    }

    if (!result) {
      console.log(`경매 상품 리스트가 존재하지 않습니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    }
    console.log(`경매 상품 리스트 조회 성공`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.X_READ_ALL_SUCCESS(`경매 상품`), result)
    });

  } catch (err) {
    console.log(`경매 상품 리스트 조회 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_ALL_FAIL(`경매`))
    });
  }
};

/*
  
  GET /auction/:id
*/
/*
  POST /auction/:id/bid
*/
exports.bid = async (req, res) => {
  try {
    const { id } = req.params;
    const { bid } = req.body;

    if (!id) {
      console.log(`경매 상품 요청 파라미터 값이 잘못되었습니다.`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.OUT_OF_VALUE)
      })
    }

    const auction = await Auction.findById(id);
    if (!auction) {
      console.log(`요청에 일치하는 경매 상품이 없습니다.`);
      res.json({
        code: sc.NO_CONTENT,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    }

    if (new Date(auction.createdAt.valueOf() + (24 * 64 * 64 * 1000)) < new Date()) {
      console.log(`경매가 이미 종료 되었습니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`경매가 이미 종료 되었습니다.`)
      });
    }

    if (!bid) {
      console.log(`입찰 정보가 유효하지 않습니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`입찰 정보가 유효하지 않습니다.`)
      })
    }

    if (bid.bid <= auction.startCost) {
      console.log(`시작 가격보다 높게 입찰해야 합니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`시작 가격보다 높게 입찰해야 합니다.`)
      });
    }

    if (auction.bid[0] && auction.bid[-1] >= bid) {
      console.log(`이전 입찰가보다 높아야 합니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`이전 입찰가보다 높아야 합니다.`)
      });
    }

    const bidObj = {
      userId: req.decoded._id,
      bid: bid.bid,
      msg: bid.msg
    };
    auction.bid.push(bidObj);
    const result = await auction.update();

    console.log(`입찰이 완료되었습니다.`);
    req.app.get('io').to(id).emit('bid', bid);
    console.log(result);
    
  } catch(err) {
    console.log(`입찰 서버 내부 오류`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
}