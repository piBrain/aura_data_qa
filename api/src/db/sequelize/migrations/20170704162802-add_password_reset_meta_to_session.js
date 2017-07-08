'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Sessions', 'passwordResetAttempts', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    })
    queryInterface.addColumn('Sessions', 'lastPasswordResetAttempt', {
      type: Sequelize.DATE,
      allowNull: true,
    })
    queryInterface.addColumn('Sessions', 'suppliedResetEmail', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Sessions', 'passwordResetAttempts')
    queryInterface.removeColumn('Sessions', 'lastPasswordResetAttempt')
    queryInterface.removeColumn('Sessions', 'suppliedResetEmail')
  }
};
