const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');

const { styleRecController, sellerRecController, keyDBController } = require('../../controllers/recommend');

router.get('/style', authMiddleware, styleRecController.styleRec);
router.get('/seller', authMiddleware, sellerRecController.sellerRec);

router.put('/keyDB', authMiddleware, keyDBController.keyDB);

module.exports = router;