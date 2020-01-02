/*
  찜 목록 페이지 조회(하트, 좋아요 누른 거)
  GET | shopper/dibList 
 */

let User = require("../../models/User");
const { au,sc,rm } = require('../../modules/utils');

exports.dibList = async (req, res) => {
  const userId = req.decoded._id;

  try {
    const dibList = await User.findOne({
      _id: userId
    });
    if (dibList.length === 0) {
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.LIKE_READ_SUCCESS, dibList.like)
      });
    };
  } catch (err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
};



