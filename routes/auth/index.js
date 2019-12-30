const express = require('express');
const router = express.Router();
const { signUpController, loginController } = require('../../controllers/auth');

// join
router.post('/signUp', signUpController.signUp);
router.get('/emailAuth', signUpController.emailAuth);

// locaLogin
router.post('/login', loginController.login);

module.exports = router;