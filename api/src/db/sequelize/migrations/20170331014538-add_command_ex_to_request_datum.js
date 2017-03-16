'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'RequestData',
      'commandEx1',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NOT REVIEWED'
      }
    )
    queryInterface.addColumn(
      'RequestData',
      'commandEx2',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NOT REVIEWED'
      }
    )
  }
};
