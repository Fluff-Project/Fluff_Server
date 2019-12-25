// test 코드
const { keyword } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');
//const keyword = require('../../models/keyword');
//const imgUrl = require('../../models/items');
//exports.ss = async() => {  //test 뺄까?
exports.ss = async (req, res) => {
  try{
    const test = {// = await survey.create({
      data : [{ 
        imageUrl:  'url',
        keyword:[ 
          "chic", 
          "modern",
          "lovely"
        ]}, { 
        imageUrl:  'url1',
        keyword:[ 
          "chic1", 
          "modern1",
          "lovely1"
        ]}, { 
        imageUrl:  'url2',
        keyword:[ 
          "chic2", 
          "modern2",
          "lovely2"
        ]},
    ]};
    res.json(test);
    console.log(test);
    }catch(err){
      console.log(err);
      res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.INTERNAL_SERVER_ERROR));  
  }
};