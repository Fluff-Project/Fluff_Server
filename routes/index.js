const express = require('express');
const router = express.Router();
let User = require('../models/User');

/* GET home page. */
router.use('/recommend',require('./recommend'));
router.use('/survey',require('./survey'));

router.get('/', (req,res) => {
  console.log(`Server ig running!!!`);
});
module.exports = router;