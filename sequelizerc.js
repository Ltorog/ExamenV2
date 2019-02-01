const Sequelize = require('sequelize')


//Creación de modelos
const ModeloStudents = require('./api/models/students')
const ModeloCourses = require('./api/models/courses')
const ModeloFinished_courses = require('./api/models/finished_courses')
const ModeloTeachers = require('./api/models/teachers')
const ModeloToken = require('./api/models/tokens')
const ModeloSubject = require('./api/models/subjects')

const sequelize = new Sequelize('postgres://backend:backend@localhost:5432/backend')

//Comando Sequelize
const Students = ModeloCourses(sequelize,sequelize)
const Courses = ModeloCourses(sequelize,sequelize)
const Finished_courses = ModeloFinished_courses(sequelize,sequelize)
const Teachers = ModeloTeachers(sequelize,sequelize)
const Token = ModeloToken(sequelize,sequelize)
const Subject = ModeloSubject(sequelize,sequelize)


//RelacionesDB
Teachers.hasMany(Courses);
Courses.belongTo(Teachers);

sequelize.sync()
    .then(() => {
        console.log('Sincronizado');
    })
    .catch(err => {
        console.log(err);
    })

module.exports = {
    Students,
    Courses,
    Finished_courses,
    Teachers,
    Tokens,
    Subject
}