const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const magazineController = require('../../controllers/magazine/magazineController');
const upload = require('../../config/multer');

router.get('/', authMiddleware,  magazineController.getMagazine);

module.exports = router;

