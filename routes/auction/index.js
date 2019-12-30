const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../../middleware/authMiddleware');

// router.get('/', authMiddleware, )

module.exports = router;