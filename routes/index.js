const express = require('express');
const router = express.Router();
let User = require('../models/User');

/* GET home page. */
router.use('/recommend',require('./recommend'));
router.use('/survey',require('./survey'));

router.get('/', async (req, res) => {
  const userObj = req.body;
  const result = User.find();

  console.log(result);
  res.send(result);
});

module.exports = router;