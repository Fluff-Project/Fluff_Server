const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const styleRecommend = require('../../controllers/recommend/styleRecController');
const recKeyDB = require('../../controllers/recommend/keyDBController');

router.get('/style', authMiddleware, styleRecommend.styleRec);
router.put('/keyDB', authMiddleware, recKeyDB.keyDB);

module.exports = router;