const express = require('express');
const { GenerateShortURL, handleGetAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/', GenerateShortURL);

router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;