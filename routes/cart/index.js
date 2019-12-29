const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const cartController = require('../../controllers/cart/cartController');

router.post('/',authMiddleware,cartController.cartAdd);
router.get('/',authMiddleware,cartController.cartList);
router.delete('/',authMiddleware,cartController.cartDelete);
router.get('/cartCnt',authMiddleware,cartController.cartCnt);

module.exports = router;