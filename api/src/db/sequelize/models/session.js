'use strict';
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define('Session', {
    id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: DataTypes.INTEGER,
    nonce: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Session;
};
