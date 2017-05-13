'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'RequestData',
      'notes',
      {
        allowNull: false,
        defaultValue: '',
        type: Sequelize.TEXT,
      }
    );
  },
};


