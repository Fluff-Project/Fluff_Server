const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/recommend',require('./recommend'));

module.exports = router;
