'use strict';
module.exports = function(sequelize, DataTypes) {
  var RequestDatum = sequelize.define('RequestDatum', {
    id: DataTypes.INTEGER,
    created_at: DataTypes.TIME,
    updated_at: DataTypes.TIME,
    parsed_request: DataTypes.STRING,
    method: DataTypes.INTEGER,
    data: DataTypes.JSON,
    form: DataTypes.JSON
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RequestDatum;
};