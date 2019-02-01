const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

// Index
router.get('/', coursesController.list);

module.exports = router;