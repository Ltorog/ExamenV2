const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

// Index
router.get('/regression/{rut}', studentsController.regression);

module.exports = router;