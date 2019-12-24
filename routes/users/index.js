const express = require('express');
const router = express.Router();

// controller
const joinController = require('../../controllers/users/joinController');
const localLoginController = require('../../controllers/users/localLoginController');

// middleware
const authMiddleware = require('../../middleware/authMiddleware');

// join
router.post('/join', joinController.join);
router.get('/emailAuthorization', joinController.emailAuthorization);

// login
router.post('/localLogin', authMiddleware, localLoginController.login);

module.exports = router;