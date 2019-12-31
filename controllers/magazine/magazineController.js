/**매거진 등록
 * POST | magazine/
 */
const Magazine = require('../../models/Magazine');
const { au, sc, rm } = require('../../modules/utils');
/*s3의 이미지 가져오기 */

exports.postMagazine = async (req, res) => {

  const articleImg = req.decoded.articleImg;
  const magazine = new Magazine({ articleImg });

  try{

    magazine.save();
    console.log(magazine);  

    if(!magazine){
      console.log("매거진 미등록 상태입니다.");
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ARTICLE_LIST_NONE)
      });
    }

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.ARTICLE_SEND_SUCCESS, magazine)
    });
  }catch(err){
    console.log(`item register failed error: ${err}`);
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ARTICLE_SHOW_FAIL)
    });
  }
}
/**매거진 조회
 * GET | magazine/
 */
exports.showMagazine = async (req, res) => {
  try{
  const { articleImg } = req.decode.articleImg;
  const magazines = await Magazine.find({articleImg});
  console.log(magazines);

  if(magazines.length ==0){
    console.log("매거진없음 에러");
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.ARTICLE_LIST_NONE)
    })
  }
  res.json({
    code: sc.OK,
    json: au.successTrue(rm.ARTICLE_SHOW_SUCCESS, magazines)
    });

  }catch(err){
    console.log(`magazine can not show error: ${err}`);  
  
    res.json({
    code: sc.BAD_REQUEST,
    json: au.successFalse(rm.ARTICLE_SHOW_FAIL)
    });
  }
}