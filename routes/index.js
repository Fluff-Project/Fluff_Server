const express = require('express');
const router = express.Router();

/* GET home page. */
router.use('/recommend',require('./recommend'));
// router.use('/survey',require('./survey'));
router.use('/cart',require('./cart'));
router.use('/order',require('./order'));
router.use('/shopper',require('./shopper'));
router.use('/follow',require('./follow'));


module.exports = router;