const express = require('express');
const router = express.Router();

const { webScrap } = require('../controllers/baseController');

router.get('/test-scrap', webScrap);

module.exports = router;
