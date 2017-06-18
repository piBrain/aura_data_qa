'use strict';
module.exports = function(sequelize, DataTypes) {
  var Site = sequelize.define('Site', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    validated: DataTypes.BOOLEAN,
    quantcast_rank: DataTypes.INTEGER,
    url: DataTypes.STRING,
    priority_domain: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Site;
};


