const express = require('express');
const router = express.Router();
const surveyController = require('../../controllers/survey/surveyController')
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/', authMiddleware, surveyController.getSurvey);

module.exports = router;
