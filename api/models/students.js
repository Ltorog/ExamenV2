'use strict';
module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('students', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        rut: DataTypes.INTEGER,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        gender: DataTypes.INTEGER,
        birthdate: DataTypes.DATE,
    }, {
        timestamps: false
    });
    /*Students.associate = function(models) {
        Students.hasMany(models.finished_courses, { as: 'Students', foreignKey: 'student_fk' });
    };*/

    return Students;
}