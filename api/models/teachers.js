'use strict';
module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define('teachers', {
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
    /*Teachers.associate = function(models) {
        Teachers.hasMany(models.courses, { as: 'Teachers', foreignKey: 'teacher_fk' });
    };*/
    return Teachers;
}