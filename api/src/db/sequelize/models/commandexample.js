'use strict';
module.exports = function(sequelize, DataTypes) {
  var CommandExample = sequelize.define('CommandExample', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: DataTypes.INTEGER,
    request_datum_id: DataTypes.INTEGER,
    text: DataTypes.STRING(2048),
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return CommandExample;
};

