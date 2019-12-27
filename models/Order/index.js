const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  // 주문 리스트
  orderList: [{ orderGoods: { type: mongoose.Schema.Types.ObjectId, ref: 'Goods' } }]
});

module.exports = mongoose.model('Order', orderSchema);
