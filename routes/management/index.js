const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const manageController = require('../../controllers/management/manageController');
const upload = require('../../config/multer');

router.post('/register',  authMiddleware, upload.array('images', 10), manageController.register);
router.put('/update', authMiddleware, upload.array('images', 10), manageController.update);
router.delete('/delete',  authMiddleware, manageController.delete);

module.exports = router;