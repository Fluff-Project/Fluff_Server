const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const dibController = require('../../controllers/shopper/dibController');

router.get('/dibList',authMiddleware,dibController.dibList);

module.exports = router;