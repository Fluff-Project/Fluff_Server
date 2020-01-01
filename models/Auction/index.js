const mongoose = require('mongoose')
const { Schema } = mongoose;

const auctionSchema = new Schema({
  auctionName: { type: String, required: true, unique: true },

  sellerName: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  comment: { type: String, required: true, unique: false },

  color: { type: [String], required: true, unique: false },

  startCost: { type: Number, default: 10000, required: true },

  size: { type: String, required: true },

  condition: { type: Number, required: true, unique: false },

  authorize: { type: Boolean, required: false },

  style: { type: [String], required: true, unique: false },

  highestCost: { type: Number, default: 0 },

  img: [String],

  saleAuth: { type: Boolean, default: false },

  bid: [{
      userId: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
      bid: Number,
      msg: String
    }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Auction', auctionSchema);