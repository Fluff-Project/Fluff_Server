/*
  클라에서 요청하는 값을 db에 저장하는 api

 */

const express = require('express');
const router = express.Router();
const reControllers = require('../../controllers/reController');

router.post('/', reControllers.create);

module.exports = router;