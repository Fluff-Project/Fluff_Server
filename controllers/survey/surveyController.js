let Survey = require('../../models/Survey');
const { au, sc, rm } = require('../../modules/utils');

/* 취향분석
  GET |/survey
*/
exports.getSurvey = async (req, res) => {
  try {
    const VERSION_1_0_1 = '5e0ade0a5d46e12961bd9cfc'

    const result = await Survey.findById(VERSION_1_0_1);
    if (!result) {
      console.log('취향분석 이미지가 존재하지 않습니다.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.SURVEY_LIST_NONE),
      }); 
    }
    console.log(`취향분석 이미지를 성공적으로 불러왔습니다.`);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.SURVEY_SHOW_SUCCESS, result)
    });

  } catch (err) {
    console.log(`survey list show failed error : ${err}`)
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.SURVEY_SHOW_FAIL)
    });
  }
}