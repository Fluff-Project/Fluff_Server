let User = require('../../models/User');
const { au, sc, rm } = require('../../modules/utils');

/*
정민
클라에게서 받은 keyword,cnt값을 그 userId를 가진 DB에 저장하기
POST | recommend/keyDB
{
    keyword : cnt
} * 30개
*/
exports.keyDB = async (req, res) => {
  const userId = req.decoded._id;
  const { style } = req.body;

  try {
    let user = await User.findOne({ _id : userId }); // id에 해당하는 유저의 정보모델
    if (!user) { 
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      user.style = style;
      await user.save();

      res.json({
        code: sc.OK,
        json: au.successTrue(rm.DB_KEYWORD_UPDATE_SUCCESS) 
      });
    };
  } catch (err) {
    console.log(err);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
};