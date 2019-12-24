const express = require('express');
const router = express.Router();
const reController = require('../../controllers/reController');

router.post('/',reController.rec);

module.exports = router;