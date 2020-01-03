const express = require('express');
const router = express.Router();

const { User, Goods, Auction, Magazine, Survey,  } = require('../models');


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