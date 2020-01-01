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

  // 팔로우 리스트
  following: [
    { followingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null }}
  ],

  // 팔로워 리스트
  follower: [
    { followerUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User',  default: null }},
  ],

  // 찜 목록
  like: [{ likeGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods' } }],

  // 장바구니
  cart: [{ cartGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods' } }],

  // 주문서 주문했던 아이디 값을 넣을 것.
  order: [{ cartGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' } }],

  // 평점
  grade: { type: Number, required: false },
  
  // 관심사
  style: style,
  
  // 생성 시간
  createdAt: { type: Date, default: Date.now, },
  
  /* 
    Seller ------------------------------------------------
  */
  // 판매자 사진
  sellerImg: { type: String, required: false},

  // 판매 상품 리스트
  saleList: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goods' }], required: false },

  // 판매자 권한
  sellerAuth: { type: Boolean, required: false, unique: false, default: false, },
});

module.exports = mongoose.model('User', userSchema);
