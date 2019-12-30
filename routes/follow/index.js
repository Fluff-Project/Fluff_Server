const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const followController = require('../../controllers/follow/followController');

router.get('/:userId/followList',authMiddleware,followController.followingList);
router.get('/:sellerId',authMiddleware,followController.followCheck);
router.post('/',authMiddleware,followController.follow);

module.exports = router;