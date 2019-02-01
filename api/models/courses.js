'use strict';

module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define('courses', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        code: DataTypes.BIGINT,
        ordinal: DataTypes.INTEGER,
        year: DataTypes.INTEGER,
        subject_fk: DataTypes.BIGINT,
        teacher_fk: DataTypes.BIGINT,
        section: DataTypes.INTEGER,

    }, {
        timestamps: false
    });
    /*Courses.associate = function(models) {
        Courses.hasOne(models.teachers, { foreignKey: 'teacher_fk' });
        Courses.hasOne(models.subjects, { foreignKey: 'subject_fk' });
        Courses.hasMany(models.finished_courses, { as: 'Courses', foreignKey: 'course_fk' });
    };*/

    return Courses;
}