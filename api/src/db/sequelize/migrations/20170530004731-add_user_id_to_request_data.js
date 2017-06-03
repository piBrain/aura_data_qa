'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'RequestData',
      'user_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'RequestData',
      'user_id'
    )
  }

};
