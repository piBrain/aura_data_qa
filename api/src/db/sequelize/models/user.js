'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return User;
};
