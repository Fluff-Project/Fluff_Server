const mongoose = require('mongoose')
const { Schema } = mongoose;
const size = require('./size');

const goodsSchema = new Schema({
  goodsName: { type: String, required: true, unique: true },

  seller: { 
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
  },

  comment: { type: String, required: false, unique: false },

  color: { type: String, required: false, unique: false },

  category: { type: String, required: false, unique: false },

  mainImg: { type: String, required: true },

  img: [String],

  price: { type: Number, required: true },

  grade: { type: Number, required: false, unique: false },

  size: size,

  condition: { type: Number, required: true, unique: false },

  style: { type: [String], required: true, unique: false },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goods', goodsSchema);
