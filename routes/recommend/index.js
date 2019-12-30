const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const keyDBController = require('../../controllers/recommend/keyDBController');
const recController = require('../../controllers/recommend/recController');

router.post('/keyDB', authMiddleware,keyDBController.keyDB);
router.get('/prefer', authMiddleware,recController.prefer);

module.exports = router;