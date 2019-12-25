/*
정민
POST | recommend/keyDB
{
    keyword : cnt
} * 30개
*/
const { Keyword } = require('../../models');
const { au, sc, rm } = require('../../modules/utils');
exports.keyDB = async (req, res) => {
  const keywords = req.body;
  console.log(keywords);
  try {
    const result = await Keyword.create(keywords);
    console.log(result);
    }
    catch (err) {
      console.log(err);
      res.status(sc.INTERNAL_SERVER_ERROR).send(au.successFalse(rm.INTERNAL_SERVER_ERROR));
}};