const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res) => {
  console.log(`Server is running`);
  res.send(`Server is running`);
})


module.exports = router;