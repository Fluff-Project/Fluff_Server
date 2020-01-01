const mongoose = require('mongoose')
const { Schema } = mongoose;
const size = require('./size');

const goodsSchema = new Schema({
  // 상품 명
  goodsName: { type: String, required: true, unique: true },

  // 판매자 username
  sellerName: { type: String, required: false, unique: false },
  
  // sellerId  => 판매자 정보 가져올 때 필요 
  sellerId: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },

  // 판매자 한줄 평
  comment: { type: String, required: false, unique: false, default: null },

  // 색상
  color: { type: [String], required: false, unique: false },

  // 카테고리
  category: { type: String, required: false, unique: false },

  gender: { type: String, required: true, default: 'unisex', default: null},

  // 메인 이미지
  mainImg: { type: String, required: true },

  // 상품 이미지 리스트
  img: { type: [String], required: false, unique: false },
  
  // 가격
  price: { type: Number, required: true, default: 0},

  // 평점
  grade: { type: Number, required: false, unique: false, default: 0},

  // 사이즈
  size: size,

  condition: { type: Number, required: true, unique: false },

  // 스타일 (취향)
  style: { type: [String], required: true, unique: false },

  // 상품 상태 1 ~ 10
  condition: { type: Number, required: true, unique: false, default: 0 },

  // 생성 시간 : (값 고정 필요)
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goods', goodsSchema);
