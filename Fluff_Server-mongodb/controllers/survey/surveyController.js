/** 취향분석 이미지 DB 저장  
 * POST | survey/
*/
let Survey = require('../../models/Survey');
const { au, sc, rm } = require('../../modules/utils');

exports.postSurvey = async (req, res) => {
  try{ 
    let surveyLists = new Survey({
      image :[
      {
        url: 'test.jpg',
        keyword: ['lovely', 'chic']
      },{
        url: '123',
        keyword: ['hiphop', 'chic']
      },{
        url: 'test2.jpg',
        keyword: ['lovely', 'amekaji']
      },{
        url: 'test3.jpg',
        keyword: ['modern', 'adf']
      },{
        url: 'test4.jpg',
        keyword: ['army', 'cool']
      } ]
    });
    surveyLists.save();

    console.log(surveyLists);
    res.json({
      code: sc.OK,
      json: au.successTrue(rm.SURVEY_SEND_SUCCESS, surveyLists)
    });
  }catch(err){
    console.log(`survey list save in DB failed error: ${err}`);

    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.SURVEY_SEND_FAIL)
    });
  }
}

/** 취향분석 이미지 보여주기 
 * GET | survey/
*/

exports.showSurvey = async (req, res) => {

  try{
    
    const lists = await Survey.find({ });
    console.log(lists);

    if(lists.length ==0){
      console.log('취향분석 이미지가 존재하지 않습니다.');
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.SURVEY_LIST_NONE),
      }); 
    }

    res.json({
      code: sc.OK,
      json: au.successTrue(rm.SURVEY_SHOW_SUCCESS, lists)
    });
  }catch(err){
    console.log(`survey list show failed error : ${err}`)
    res.json({
      code: sc.BAD_REQUEST,
      json: au.successFalse(rm.SURVEY_SHOW_FAIL)
    });
  }
}