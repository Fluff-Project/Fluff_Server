let { Auction } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');


/**
 * @author ooeunz
 * @see POST /auction
 * 
 * @param auctionName $경매 상품이 름
 * @param img $이미지 리스트
 * @param color $상품 색상
 * @param category $상품 카태고리
 * @param style $상품의 스타일 (취향 분석에 사용됨)
 * @param size $사이즈
 * @param startCost $시작 가격
 * @param comment $판매자 한줄 평
 * @param condition $상품 상태
*/

// not use controller in app jam.
exports.regist = async (req, res) => {  // img는 multer로
  try {
    // 어느정도 동안 경매하고 싶은 지 period 넣어서 경매 인가 했을 때 경매 인가된 시간+period = deadline.
    // body 받아올 때 p 까지... (채린언니한테 받기.)
    const { auctionName, img, color, category, hashtag, size, startCost, comment, condition, style } = req.body;
    const auction = new Auction({ auctionName, img, color, category, hashtag, size, startCost, comment, condition, style });
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

/**
 * @author ooeunz
 * @see POST auction/auth
 * 
 * @param auth $boolean
*/
// not use controller in app jam.
exports.authorize = async (req, res) => {
  const { auth } = req.body;
  const { id } = req.params;
  const auction = Auction.findById(id);

  try {
    if (auth) {
      auction.authorize = true; 
      auction.authTime = Date.now(); // 인가 시간 넣기

      console.log(auction.authTime)
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
  경매 상품 리스트 조회
  GET auction?sort={정렬방식}
  sort=deadline : 경매시간이 남지않은 순으로 조회.
*/
exports.auctionList = async (req, res) => {
  try {
    // response
    // let result = await Auction.find().where('saleAuth').equals(true).sort(createdAt);
    let result = await Auction.find().where('saleAuth').equals(true).sort('createdAt');

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
    console.log(`Error Code: ${err}`);
    
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_ALL_FAIL(`경매`))
    });
  }
};

/**
 * @author ooeunz
 * @see POST auction/:id/bid
 * 
 * @param bid $obj: bid, msg
 * @param id $auction room id
*/
exports.bid = async (req, res) => {
  try {
    const { bid } = req.body;
    const { auctionId } = req.params;

    if (!auctionId) {
      console.log(`경매 상품 요청 파라미터 값이 잘못되었습니다.`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.OUT_OF_VALUE)
      });
    }
    console.log('1');
    
    if (!bid) {
      console.log(`입찰 정보가 유효하지 않습니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`입찰 정보가 유효하지 않습니다.`)
      })
    }
    console.log('2');


    // basic debug
    console.log(`[Debug] router-id: ${auctionId}`);
    console.log(`[Debug] router-bid: ${bid}`);

    const auction = await Auction.findById(auctionId);
    if (!auction) {
      console.log(`요청에 일치하는 경매 상품이 없습니다.`);
      res.json({
        code: sc.NO_CONTENT,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    }
    console.log('3');


    if (new Date(auction.createdAt.valueOf() + (24 * 64 * 64 * 1000)) < new Date()) {
      console.log(`경매가 이미 종료 되었습니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`경매가 이미 종료 되었습니다.`)
      });
    }
    console.log('4');


    if (bid <= auction.startCost) {
      console.log(`시작 가격보다 높게 입찰해야 합니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`시작 가격보다 높게 입찰해야 합니다.`)
      });
    } 
    console.log('5');
    
    if (auction.bid[0] && auction.bid[-1] >= bid) {
      console.log(`이전 입찰가보다 높아야 합니다.`);
      res.json({
        code: sc.FORBIDDEN,
        json: au.successFalse(`이전 입찰가보다 높아야 합니다.`)
      });
    }
    console.log(`6`);


    req.app.get('io').to(auctionId).emit('bid', bid);
    console.log(`${bid}원 입찰 완료!!!`);
    res.json({
      code: 200,
      json: au.successTrue(`성공`, { bid: bid })
    })
    
    auction.bid.push({
      userId: req.decoded._id,
      bid: bid
    })
    const result = await auction.save();
    console.log(`Push bid in database: ${result}`);
    
  } catch (err) {
    console.log(`\n입찰가 유효성 체크 중 Error 발생!`);
    console.log(`Error Code: ${err}`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(`입찰가 유효성 체크 중 Error 발생!`)
    })
  };
}