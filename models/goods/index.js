const mongoose = require('mongoose')
const { Schema } = mongoose;
const size = require('./size');

const goodsSchema = new Schema({
  goodsName: { type: String, required: true, unique: true },

  seller: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
  },

  comment: { type: String, required: false, unique: false, default: null },

  color: { type: String, required: false, unique: false, default: null },

  style: { type: String, required: false, unique: false, default: null},

  gender: { type: String, required: true, default: 'unisex', default: null},

  img: [String],

  price: { type: Number, required: true, default: 0},

  grade: { type: Number, required: false, unique: false, default: 0},

  size: size,

  condition: { type: Number, required: true, unique: false, default: 0 },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goods', goodsSchema);
