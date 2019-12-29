const mongoose = require('mongoose')
const { Schema } = mongoose;
const size = require('./size');

const goodsSchema = new Schema({
  // 상품 명
  goodsName: { type: String, required: true, unique: true },

  // 판매자
  sellerName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // 판매자 한줄 평
  comment: { type: String, required: false, unique: false },

  // 색상
  color: { type: [String], required: false, unique: false },

  // 카테고리
  category: { type: String, required: false, unique: false },

  // 해시태그
  hashtag: { type: [String], required: false, unique: true },

  // 메인 이미지
  mainImg: { type: String, required: true },

  // 상품 이미지 리스트
  img: { type: [String], required: false, unique: false },

  // 가격
  price: { type: Number, required: true },

  // 평점
  grade: { type: Number, required: false, unique: false },

  // 사이즈
  size: size,
  condition: { type: Number, required: true, unique: false },

  // 스타일
  style: { type: [String], required: true, unique: false },

  // 생성 시간 : (값 고정 필요)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goods', goodsSchema);
