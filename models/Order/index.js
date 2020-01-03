const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderList: [{ orderGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods' } }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
