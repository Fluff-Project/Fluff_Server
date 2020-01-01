/** 상품등록
 * POST | management/registration
*/
let Goods = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

const generateRandom = (min, max) => {
  let ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  return ranNum;
}

exports.register = async (req, res) => {
  const { goodsName, comment, color, price, gender, size, condition, style} = req.body;

  let files = req.files;
  
  try{

    const savedGoods = await Goods.findOne({ goodsName:goodsName });

    if(savedGoods){
      console.log('같은 이름으로 등록된 상품이 존재합니다.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_DATA_NOT_COMPLETE),
      }); 
    }

    if(files.length==0){
      console.log('업로드할 파일을 등록하지 않았습니다.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.FILE_NONE),
      }); 
    }

    let imageArr = files.map(it => it.location);
    let mainImg = imageArr[0];
    let images = imageArr.splice(1, imageArr.length-1);
  
    let goods =  new Goods({
      goodsName: goodsName,
      comment: comment,
      color: color,
      gender: gender,
      mainImg: mainImg,   //image[0],
      img: images,       //image[1] ~
      price: price,
      grade: generateRandom(0, 5),  // 난수 생성
      size: size,
      condition: condition,
      style: style,
      sellerId: {id: req.decoded._id}
    });
    
    goods.save(); 

    let show = await Goods.find({ goodsName: goodsName }).select(" _id  mainImg ");
    console.log(show);

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_INSERT_SUCCESS, show),
    }); 

  } catch(err){
      console.log(`item register failed error: ${err}`);
      res.json({
        code: sc.INTERNAL_SERVER_ERROR,
        json: au.successFalse(rm.ITEM_INSERT_FAIL)
      });
  } 
}

/* 상품 삭제
  DELETE management/delete
*/
exports.delete = async (req, res) => {
  const { goodsId }  = req.body;
  try{

    const result = await Goods.findByIdAndRemove(goodsId, { sellerId: req.decoded._id}, (err, documents) => {
      if (err) {
        console.log(`해당 유저의 상품이 아닙니다.`);
        res.json({
          code: sc.BAD_REQUEST,
          json: au.successFalse(`해당 유저의 상품이 아닙니다.`)
        });
      }
      console.log(`goodsId:[${goodsId}] 상품을 성공적으로 삭제하였습니다.`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ITEM_DELETE_SUCCESS, documents)
      });
    });

    if (!result) {
      console.log('삭제할 아이템이 존재하지 않습니다.')
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.NOT_FOUND_ID),
      }); 
    }
    

  } catch(err){
      console.log(`item delete failed error: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_DELETE_FAIL)
      });
  }
}


/* 상품수정
  PUT management/update
*/
exports.update = async (req, res) => {
  try {
    const { goodsId, goodsName, comment, color, price, gender, size, condition, style } = req.body;
    
    // all unaltered values are required.
    if (!goodsId | !goodsName | !comment | !color | !price| !gender | !size | !condition | !style) {
      console.log(`수정을 위한 모든 값들이 충족되지 않았습니다.`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(`수정을 위한 모든 값들이 충족되지 않았습니다.`)
      });
      
    }
    const options = { goodsName, comment, color, category, price, gender, size, condition, style };

    const result = await Goods.findByIdAndUpdate(goodsId, options, (err, documents) => {
      if (err) {
        console.log('해당 유저의 상품이 아닙니다.');
        res.json({
          code: sc.BAD_REQUEST,
          json: au.successFalse('해당 유저의 상품이 아닙니다.')
        });
      }
      console.log(`goodsId:[${goodsId}] 상품을 성공적으로 수정하였습니다.`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ITEM_UPDATE_SUCCESS, documents)
      });
    });
    
    if(!result){
      console.log('수정할 상품이 존재하지 않습니다.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.NOT_FOUND_ID)
      });
    };
    
  } catch (err) {
    console.log(`item update failed error: ${err}`);
    res.json({
      code: sc.DB_ERROR,
      json: au.successFalse(rm.ITEM_UPDATE_FAIL)
    });
  }
}