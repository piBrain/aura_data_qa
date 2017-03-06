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
    method: DataTypes.INTEGER,
    data: DataTypes.JSON,
    form: DataTypes.JSON,
    validated: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RequestDatum;
};
