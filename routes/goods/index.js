const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/authMiddleware');
const { detailController, filterController, thumbnailController } = require('../../controllers/goods')

router.get('/thumbnail', authMiddleware, thumbnailController.thumbnail);
router.get('/:sellerId', authMiddleware, detailController.goodsDetail);
router.get('/:goodsId', authMiddleware, detailController.goodsDetail);

router.post('/filter', authMiddleware, filterController.filter);

router.get('/:goodsId/like', authMiddleware, detailController.likeCnt);
router.post('/:goodsId/like', authMiddleware, detailController.useLike);



module.exports = router;