const express = require('express');
const router = express.Router();
const regiController = require('../../controllers/management/regiController');
const updateController = require('../../controllers/management/updateController');
const delController = require('../../controllers/management/delController');

router.post('/', regiController.register);
router.put('/', updateController.update);
router.delete('/', delController.delete);

module.exports = router;
