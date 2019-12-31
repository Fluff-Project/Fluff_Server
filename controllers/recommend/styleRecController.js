const contentRecommend = require('../../modules/recommend/contentRecommend');
const { au, sc, rm } = require('../../modules/utils');

exports.styleRec = (req, res) => {
  try {
    const result = contentRecommend(req.decoded);
    console.log('스타일 추천 success');
    res.json({
      code: sc.OK,
      json: au.successTrue('스타일 추천 success', result)
    });
  } catch (err) {
    console.log('스타일 추천 fail');
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
}