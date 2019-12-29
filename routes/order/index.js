const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const orderController = require('../../controllers/order/orderController');

router.post('/goodsList',authMiddleware,orderController.orderList);
router.get('/goodsList',authMiddleware,orderController.readOrder);

module.exports = router;