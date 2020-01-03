const mongoose = require('mongoose')
const { Schema } = mongoose;

const auctionSchema = new Schema({
  auctionName: { type: String, required: true, unique: true },

  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  sellerName: { type: String, required: false },

  comment: { type: String, required: true, unique: false },

  color: { type: [String], required: true, unique: false },

  startCost: { type: Number, default: 10000, required: true },

  size: { type: String, required: true },

  condition: { type: Number, required: true, unique: false },

  authorize: { type: Boolean, required: false },

  style: { type: [String], required: true, unique: false },

  img: [String],

  saleAuth: { type: Boolean, default: false },

  // 마감 시간(남은 시간)
  deadline: { type: Date }, 

  // 경매 인가(시작) 시간
  authTime: { type: Date },

  bid: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
      bid: Number, // default : startCost 로 수정하기
      createdAt: { type: Date, default: Date.now }
  }],

  // 경매 시간
  period: { type: Number, required: false },

  // authroize: true와 동시에 기록됨.
  deadline: { type: Date, required: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auction', auctionSchema);