const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../../middleware/authMiddleware');
const auctionController = require('../../controllers/auction/auctionController');
const app = require('../../app');

router.get('/', (req, res) => {
  res.send('/auction')
})

router.post('/:id/bid', authMiddleware, auctionController.bid);

// router.get('/', authMiddleware, )
router.get('/test', (req, res) => {
  app.get('io').to(3).emit('test', bid);
  res.send('success')
})

module.exports = router;