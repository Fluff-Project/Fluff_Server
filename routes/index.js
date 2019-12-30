const express = require('express');
const router = express.Router();
let User = require('../models/User');

/* GET home page. */
router.use('/recommend',require('./recommend'));
router.use('/survey',require('./survey'));
router.use('/management',require('./management'));
router.use('/magazine',require('./magazine'));
router.use('/shopper',require('./shopper'));

router.get('/', (req,res) => {
  console.log(`Server ig running!!!`);
});
module.exports = router;