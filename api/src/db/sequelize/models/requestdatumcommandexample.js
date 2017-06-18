'use strict';
module.exports = function(sequelize, DataTypes) {
  var RequestDatumCommandExample = sequelize.define('RequestDatumCommandExample', {
    command_example_id: DataTypes.INTEGER,
    request_datum_id: DataTypes.INTEGER,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return RequestDatumCommandExample;
};
