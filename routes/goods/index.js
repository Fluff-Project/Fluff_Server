const express = require('express');
const router = express.Router({ mergeParams: true });

const authMiddleware = require('../../middleware/authMiddleware');
const { detailController, filterController, thumbnailController, listController } = require('../../controllers/goods')

// get thumbnail list
router.get('/thumbnail', authMiddleware, thumbnailController.thumbnail);

// get goods detail
router.get('/:goodsId', authMiddleware, detailController.goodsDetail);

// get seller detail
router.get('/seller/:sellerId', authMiddleware, detailController.sellerDetail);

// filtering
router.post('/filter', authMiddleware, filterController.filter);

// check like condition
router.get('/:goodsId/like', authMiddleware, detailController.checkLike);
// get like
router.post('/:goodsId/like', authMiddleware, detailController.useLike);

// get goods category list
// /goods?category={category}&page={7}
router.get('/', listController.category);


// count like
// router.get('/:goodsId/likeCnt', authMiddleware, detailController.likeCnt);

module.exports = router;