const express = require('express');
const router = express.Router();
let User = require('../models/User');

/* GET home page. */
router.use('/recommend',require('./recommend'));
router.use('/survey',require('./survey'));
router.use('/cart',require('./cart'));
router.use('/order',require('./order'));


router.get('/', (req,res) => {
  console.log(`Server ig running!!!`);
});
module.exports = router;