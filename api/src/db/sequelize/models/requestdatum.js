'use strict';
module.exports = function(sequelize, DataTypes) {
  var RequestDatum = sequelize.define('RequestDatum', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    created_at: DataTypes.TIME,
    updated_at: DataTypes.TIME,
    parsed_request: DataTypes.STRING,
    method: DataTypes.STRING,
    data: DataTypes.JSON,
    form: DataTypes.JSON,
    validated: DataTypes.BOOLEAN,
    found_at: DataTypes.STRING,
    commandEx1: DataTypes.STRING,
    commandEx2: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RequestDatum;
};
