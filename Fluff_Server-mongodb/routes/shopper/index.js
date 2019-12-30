const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/authMiddleware');
const toSellerController = require('../../controllers/shopper/toSellerController');

router.get('/toSeller', authMiddleware, toSellerController.toSeller);

module.exports = router;