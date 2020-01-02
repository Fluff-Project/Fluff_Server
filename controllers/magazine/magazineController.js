/**매거진 조회
 * GET | magazine/
 */
let Magazine = require('../../models/Magazine');
const { au, sc, rm } = require('../../modules/utils');

exports.getMagazine = async (req, res) => {
  
  try{  
    let magazines = await Magazine.find({}).select(" _id imgUrl ");
    console.log(magazines);

    if(!magazines){
      console.log("매거진이 없습니다.");
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.ARTICLE_LIST_NONE)
      })
    }
    
    console.log("매거진 조회에 성공했습니다.");
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