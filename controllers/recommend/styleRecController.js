const contentRecommend = require('../../modules/recommend/contentRecommend');
const { au, sc, rm } = require('../../modules/utils');

exports.styleRec = (req, res) => {
  try {
    const rec = contentRecommend(req.decoded);
    console.log(`스타일 추천 sucess`);
    res.json({
      code: sc.OK,
      json: au.successTrue(`스타일 추천 sucess`, result)
    });
  } catch (err) {
    console.log(`스타일 추천 fail`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(INTERNAL_SERVER_ERROR)
    });
  }
}