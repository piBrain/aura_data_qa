'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'RequestData',
      'tags',
      {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.STRING,
      }
    );
  },
};


