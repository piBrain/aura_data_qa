'use strict';
module.exports = function(sequelize, DataTypes) {
  var RequestDatum = sequelize.define('RequestDatum', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    createdAt: DataTypes.TIME,
    updatedAt: DataTypes.TIME,
    request: DataTypes.STRING,
    method: DataTypes.STRING,
    data: DataTypes.JSON,
    form: DataTypes.JSON,
    notes: DataTypes.TEXT,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        RequestDatum.hasMany(models.CommandExample)
      }
    },
    instanceMethods: {
    }
  });
  return RequestDatum;
};
