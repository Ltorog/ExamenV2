const express = require('express');
const router = express.Router();
const tokensController = require('../controllers/tokens');

// Index
router.get('/authenticate', tokensController.authenticate);

module.exports = router;