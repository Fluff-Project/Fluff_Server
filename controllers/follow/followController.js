/*
  내가 팔로우한 상점 리스트 조회
  GET | follow/:userId/followingList
  
  팔로우/언팔로우 여부 체크 조회
  GET | follow/

  팔로우 하기/취소하기
  POST | follow/
*/

let User = require("../../models/User");
const {
  au,
  sc,
  rm
} = require('../../modules/utils');

/*
  내가 팔로우한 상점 리스트 조회
  GET | shopper/:userId/followingList
*/
exports.followingList = async (req, res) => {
  const {
    userId
  } = req.params;

  try {
    let followList = await User.findById(userId);

    if (followList.length === 0) {
      return res.json({
        code: sc.BAD_REQUEST,
        json: au.successFalse(rm.DB_NOT_MATCHED_ERROR)
      });
    } else {
      const following = followList.following;

      res.json({
        code: sc.OK,
        json: au.successTrue(rm.FOLLOWING_READ_SUCCESS, following)
      });
    };
  } catch (err) {
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  }
};

/*
  상점 팔로우/언팔로우 여부 체크 조회
  GET | follow/:sellerId
 */
exports.followCheck = async (req, res) => {
  const userId = req.decoded._id;
  const {
    sellerId
  } = req.params;

  try {
    let user = await User.findById(userId);
    const followCheck = user.following[0]._id;

    if (followCheck == sellerId) {
      console.log(`이미 팔로우하고 있습니다.`);
      const result = {
        sellerId,
        state: true
      };
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.ALREADY_X(`팔로우`), result)
      });
    } else {
      console.log(`팔로우하지 않았습니다.`);
      const result = {
        sellerId,
        state: false
      };
      res.json({
        code: sc.BAD_REQUEST,
        json: au.successTrue(rm.NO_X(`팔로우`), result)
      });
    };
  } catch (err) {
    console.log(`팔로우 여부 조회 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_FAIL(`팔로우 여부`))
    });
  };
};

/*
  팔로우 하기/취소하기
  sellerId body로 받기, sellerId가 검색이 되면 이미 팔로우한 상태이므로 언팔.
  POST | /follow
*/
exports.follow = async (req, res) => {
  const userId = req.decoded._id;
  const {
    sellerId,
    state
  } = req.body;

  try {
    const user = await User.findById(userId);
    // sellerId 에 해당하는 followingList 지우기
    if (sellerId && state == true) {
      user.following.remove({
        _id: sellerId
      });
      user.save();
      console.log(`팔로우 취소`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.X_CREATE_SUCCESS(`팔로우 취소`))
      });
    } else {
      // 팔로우 리스트에 추가하기
      user.following.push({_id: sellerId});
      user.save();
      
      console.log(`팔로우 성공`);
      res.json({
        code: sc.OK,
        json: au.successTrue(rm.X_CREATE_SUCCESS(`팔로우 성공`))
      });
    };
  } catch (err) {
    console.log(`팔로우 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.INTERNAL_SERVER_ERROR)
    });
  };
};
