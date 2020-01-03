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

router.get('/test', (req, res) => {
  res.render('index');
});

module.exports = router;