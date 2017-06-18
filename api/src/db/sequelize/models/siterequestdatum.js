'use strict';
module.exports = function(sequelize, DataTypes) {
  var SiteRequestData = sequelize.define('SiteRequestData', {
    site_id: DataTypes.INTEGER,
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
        
      }
    }
  });
  return SiteRequestData;
};
