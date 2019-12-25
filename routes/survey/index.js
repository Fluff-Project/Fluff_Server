const express = require('express');
const router = express.Router();
const surveyController = require('../../controllers/survey/surveyController');

router.get('/', surveyController.ss);

module.exports = router;
