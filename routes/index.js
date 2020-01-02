const express = require('express');
const router = express.Router();

const { User, Goods, Order } = require('../models');

let Survey = require('../models/Survey')


/* GET home page. */
router.get('/', (req, res) => {
  console.log(`Server is running`);
  res.send(`Server is running`);
});

router.post('/', async (req, res) => {
  const { survey } = req.body;
  
  const obj = new Survey(survey);
  const result = await obj.save();
  
  res.send(result);
  console.log(result);
});

// test
router.get('/test', async (req, res) => {

  let order = new Order();
  order.orderName = 'abcdefg';
  const result = await order.save();

  console.log(result);
  res.json(result);
});

module.exports = router;