const express = require('express');
const router = express.Router();
const { signUpController, loginController } = require('../../controllers/auth');

// check duplicate data before sign up
router.post('/checkEmail', signUpController.checkEmail);
router.post('/checkUsername', signUpController.checkUsername);

// email sign up
router.post('/signUp', signUpController.signUp);
router.get('/emailAuth', signUpController.emailAuth);

// direct sign up
router.post('/directSignUp', signUpController.directSignUp);

// localLogin
router.post('/login', loginController.login);

module.exports = router;