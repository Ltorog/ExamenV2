'use strict';
module.exports = (sequelize, DataTypes) => {
    const Finished_courses = sequelize.define('finished_courses', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        course_fk: DataTypes.BIGINT,
        student_fk: DataTypes.BIGINT,
        grade: DataTypes.BIGINT,
        status: DataTypes.INTEGER
    }, {
        timestamps: false
    });
    /*Finished_courses.associate = function(models) {
        Finished_courses.hasOne(models.courses, { as: 'Finished_courses', foreignKey: 'course_fk' });
        Finished_courses.hasOne(models.students, { as: 'Finished_students', foreignKey: 'student_fk' });
    };*/
    return Finished_courses;
}