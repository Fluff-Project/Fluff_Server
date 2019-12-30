const express = require('express');
const router = express.Router();
let User = require('../models/User');
const authmiddleware = require('../middleware/authMiddleware');

const address = require('../modules/api/addressApi');

/* GET home page. */
router.use('/recommend',require('./recommend'));
router.use('/survey',require('./survey'));
router.use('/cart',require('./cart'));
router.use('/order',require('./order'));


router.get('/', (req,res) => {
  console.log(req.decoded.email);
  console.log(`Server ig running!!!`);
  
  const result = address('영통구');
  console.log(result);
  
});
module.exports = router;