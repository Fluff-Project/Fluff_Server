const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const dibController = require('../../controllers/shopper/dibController');
const toSellerController = require('../../controllers/shopper/toSellerController');
const upload = require('../../config/multer');

router.get('/dibList',authMiddleware,dibController.dibList);
router.post('/toSeller',authMiddleware, upload.single('image'), toSellerController.toSeller);


module.exports = router;