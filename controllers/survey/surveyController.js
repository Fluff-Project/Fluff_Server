/*
  GET | survey
*/
let survey = require('../../models/survey'); //가정
const { au, sc, rm } = require('../../modules/utils');

exports.survey = async (req, res) => {
  try{
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ITEM_LIST_SUCCESS, survey)
      });
    //확인차 
    console.log(survey);
  } catch (err) {
    res.json({
      code: sc.NO_CONTENT,
      json: au.successFalse(rm.ITEM_LIST_FAIL)
    });
  }
};