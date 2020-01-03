const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../../middleware/authMiddleware');
const auctionController = require('../../controllers/auction/auctionController');
const app = require('../../app');

router.get('/', (req, res) => {
  res.send('/auction')
})

router.post('/:auctionId/bid', authMiddleware, auctionController.bid);
router.get('/auctionList', authMiddleware, auctionController.auctionList);

router.post('/register',  authMiddleware, auctionController.register);

module.exports = router;