'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'secQuestion1', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'secQuestion2', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'secQuestionResponse1', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'secQuestionResponse2', {
      type: Sequelize.STRING,
      allowNull: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'secQuestion1')
    queryInterface.removeColumn('Users', 'secQuestion2')
    queryInterface.removeColumn('Users', 'secQuestionResponse1')
    queryInterface.removeColumn('Users', 'secQuestionResponse2')
  }
};
