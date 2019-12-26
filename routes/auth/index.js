const express = require('express');
const router = express.Router();

const signUpController = require('../../controllers/auth/signUpController');
const localLoginController = require('../../controllers/auth/localLoginController');

const authMiddleware = require('../../middleware/authMiddleware');

// join
router.post('/join', signUpController.signUp);
router.get('/emailAuthorization', signUpController.emailAuth);

// login
router.post('/localLogin', authMiddleware, localLoginController.login);

module.exports = router;