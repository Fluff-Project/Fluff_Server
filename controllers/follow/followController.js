/*
  내가 팔로우한 상점 리스트 조회
  GET | follow/:userId/followList
  
  팔로우/언팔로우 여부 체크 조회
  GET | follow/:sellerId

  팔로우 하기/취소하기
  POST | follow/
*/

let User = require("../../models/User");
let ObjectId = require('mongodb').ObjectID;
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
  console.log(sellerId);
  try {
    let user = await User.findById(userId);
    const n = [];
    for (i in user.following) {
      if (user.following[i]._id == sellerId) {
        n.push(user.following[i]._id);
      }
    };

    if (n.length > 0) {
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
    let user = await User.findOne({
      _id: userId
    });
    const n = [];
    for (i in user.following) {
      if (user.following[i]._id == sellerId) {
        n.push(user.following[i]._id);
      }
    };
    console.log(n.length);
    // DB에 존재하고 status가 true면 팔로우 -> 팔로우 취소
    if (n.length > 0 & state == true) {
      let result = user.following.remove({
        _id: ObjectId(sellerId)
      });
      user.save();

      res.json({
        code: sc.OK,
        json: au.successTrue(rm.X_CREATE_SUCCESS(`팔로우 취소`),result)
      });
    } else {
      if (n.length > 0 & state == false) {
        console.log(`이미 있는 값임.`);
        res.json({
          code: sc.BAD_REQUEST,
          json: au.successFalse(rm.X_UPDATE_FAIL(`이미 팔로우 되어있어서`))
        });
      } else {
        if (n.length == 0 & state == true) {
          res.json({
            code: sc.BAD_REQUEST,
            json: au.successFalse(rm.X_UPDATE_FAIL(`팔로우 안되어 있는데 상태가 true여서`))
          });
        } else {
          let result =user.following.push({
            following: {
              _id: ObjectId(sellerId)
            }
          });
          user.save();
          console.log(`팔로우 성공`);

          res.json({
            code: sc.OK,
            json: au.successTrue(rm.X_CREATE_SUCCESS(`팔로우 성공`),result)
          });
        };
      };
    };
  } catch (err) {
    console.log(`팔로우 상태 변경 실패`);
    res.json({
      code: sc.INTERNAL_SERVER_ERROR,
      json: au.successFalse(rm.X_READ_FAIL(`팔로우 여부`))
    });
  };
};
