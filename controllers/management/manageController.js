/** 상품등록
 * POST | management/registration
*/
let Goods = require('../../models/Goods');
const { au, sc, rm } = require('../../modules/utils');

exports.register = async (req, res) => {
  const { goodsName, sellerName, comment, color, category, price, gender, grade, size, condition, hashtag, style, createdAt} = req.body;

  let files = req.files;
  
  try{

    const test = await Goods.findOne({ goodsName:goodsName });

    if(!test.goodsName || !test.condition || !test.style || !test.price){
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_DATA_NOT_COMPLETE),
      }); 
    } else{

      if(files.length==0){
  
        console.log('업로드할 파일을 등록하지 않았습니다.');
        res.json({
          code: sc.BAD_REQUEST,
          json: au.successFalse(rm.FILE_NONE),
        }); 
      }else{

          let imageArr = files.map(it => it.location);
          let mainImg = imageArr[0];
          let images = imageArr.splice(1, imageArr.length-1);
        
          let goods =  new Goods({
            goodsName: goodsName,
            sellerName: sellerName,
            comment: comment,
            color: color,
            gender: gender,
            category: category,
            mainImg: mainImg,   //image[0],
            img: images,       //image[1] ~
            price: price,
            grade: grade,
            size: size,
            condition: condition,
            hashtag: hashtag,
            style: style,
            createdAt: createdAt
          })
          
          goods.save(); 
          res.json({
            code: sc.CREATED,
            json: au.successTrue(rm.ITEM_INSERT_SUCCESS, goods),
          }); 
    
      } //end else
    } 
  } catch(err){
      console.log(`item register failed error: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_INSERT_FAIL)
      });
  } 
}

/** 상품 삭제
 * DELETE | management/delete
 */

exports.delete = async (req, res) => {

    const goodsName = req.decoded.goodsName;
//  const { goodsName }  = req.body;
  try{
    // db에서 조회해서 저 값이 있는지를 확인해야함. 
    const test = await Goods.findOne({ goodsName: goodsName});
    if(!test){
      console.log('삭제할 아이템이 존재하지 않습니다.')
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.NOT_FOUND_ID),
      }); 
    };  

    const removeItem = await  Goods.findOneAndRemove({ goodsName });
    removeItem.save();

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_DELETE_SUCCESS, removeItem)
    });
  } catch(err){
      console.log(`item delete failed error: ${err}`);
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ITEM_DELETE_FAIL)
      });
  }
}


/** 상품수정
 * PUT | management/update
 */
exports.update = async (req, res) => {
  
  const { images, mainImg, sellerName, comment, color, category, price, grade, size, condition, hashtag, style, createdAt} = req.body;

// 실제 작동시 이 코드로 사용하기!
    const goodsName = req.decoded.goodsName;
//  const { goodsName } = req.body;
  
  try{
  
    console.log(goodsName);

    if(!goodsName){
      console.log("권한없음");
      res.json({
        code: sc.UNAUTHORIZED,
        json: au.successFalse(rm.ITEM_UPDATE_FAIL)
      });
    };
/*
    let files = req.files;
    let imageArr = files.map(it => it.location);
    let mainImg = imageArr[0];
    let images = imageArr.splice(1, imageArr.length-1);
  */
 //업데이트시 바뀌지 않은 값도 바뀌지 않은 그대로 넣어주세요
    const change = await Goods.update(
      { goodsName: goodsName}, 
      { $set: {
        sellerName: sellerName,
        comment: comment,
        color: color,
        gender: gender,
        category: category,
        hashtag: hashtag,
        mainImg: mainImg, 
        img: images,  
        price: price,
        grade: grade,
        size: size,
        condition: condition,
        hashtag: hashtag,
        style: style,
        createdAt: createdAt, 
    }});

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ITEM_UPDATE_SUCCESS, change)
    });
  } catch(err){
      console.log(`item update failed error: ${err}`);
      res.json({
        code: sc.DB_ERROR,
        json: au.successFalse(rm.ITEM_UPDATE_FAIL)
      });
    }
}
