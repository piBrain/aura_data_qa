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
        // associations can be defined here
        // User.belongsTo(models.Session, {
        //   onDelete: "CASCADE",
        //   foreignKey: {
        //     allowNull: false
        //   }
        // })
      }
    }
  });
  return User;
};
