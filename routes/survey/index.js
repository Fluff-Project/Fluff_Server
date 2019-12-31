const express = require('express');
const router = express.Router();
const surveyController = require('../../controllers/survey/surveyController')
const authMiddleware = require('../../middleware/authMiddleware');

router.post('/', authMiddleware, surveyController.postSurvey);
router.get('/', authMiddleware, surveyController.showSurvey);


module.exports = router;
