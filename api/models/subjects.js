'use strict';
module.exports = (sequelize, DataTypes) => {
    const Subjects = sequelize.define('subjects', {
        pk: {
            primaryKey: true,
            type: DataTypes.BIGINT,

        },
        code: DataTypes.STRING,
        name: DataTypes.STRING,
        created: DataTypes.DATE


    }, {
        timestamps: false
    });
    /*Subjects.associate = function(models) {
        Subjects.hasMany(models.courses, { as: 'Subjects', foreignKey: 'subject_fk' });
    };*/
    return Subjects;
}