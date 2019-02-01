const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses');

// Index de courses
router.get('/', coursesController.list);

module.exports = router;