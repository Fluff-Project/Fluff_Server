const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/recommend',require('./recommend'));
router.use('/survey',require('./survey'));
router.use('/cart',require('./cart'));
router.use('/order',require('./order'));


module.exports = router;