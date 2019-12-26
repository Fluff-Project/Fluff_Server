const express = require('express');
const router = express.Router();
const itemsController = require('../../../controllers/sales/items/itemsController');
const authMiddleware = require('../../../middleware/authMiddleware');

router.get('/:id', authMiddleware, itemsController.detail);
router.post('/filter', authMiddleware, itemsController.filter);
router.get('/thumbnail	', authMiddleware, itemsController.thumbnail);

module.exports = router;