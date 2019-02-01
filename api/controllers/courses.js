'use strict';
const Sequelize = require('sequelize');
const { client } = require('pg');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/backend')
const models = require('../models');
const Students = models.students;
const Token = models.tokens;
const Finished_Courses = models.finished_courses;
const Courses = models.courses;
const Subjects = models.subjects;

module.exports = {
  list: function() { return 'hi'}
}

