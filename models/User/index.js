const mongoose = require('mongoose');
const { Schema } = mongoose;
const style = require('./style');

const userSchema = new Schema({
  // 이메일
  email: { type: String, required: true, unique: true, default: null },
  
  // 비밀번호
  pwd: { type: String, required: true, unique: true, default: null },

  // 닉네임
  username: { type: String, required: true, unique: true, default: null },

  // 성별
  gender: { type: String, required: true, unique: false, default: null },

  // 배송지
  address: { type: String, required: false, unique: false, default: null },

  // 휴대폰 번호
  phone: { type: String, required: false, unique: false, default: null },

  // 판매자 권한
  sellerAuth: { type: Boolean, required: false, unique: false, default: false, },

  // 팔로우 리스트
  following: [
    { followingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null }}
  ],

  // 팔로워 리스트
  follower: [
    { followerUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null }},
  ],

  // 찜 목록
  like: [{ likeGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods' }, default: false }],

  // 장바구니
  cart: [{ cartGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods', default: null } }],

  // 주문서
  order: [{ cartGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null } }],
  
  // 관심사
  style: style,

  // 생성 시간
  createdAt: { type: Date, default: Date.now, }
});

module.exports = mongoose.model('User', userSchema);
