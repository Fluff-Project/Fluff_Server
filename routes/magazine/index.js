const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const magazineController = require('../../controllers/magazine/magazineController');

router.get('/', authMiddleware, magazineController.showMagazine);
router.post('/', authMiddleware, magazineController.postMagazine);

module.exports = router;
