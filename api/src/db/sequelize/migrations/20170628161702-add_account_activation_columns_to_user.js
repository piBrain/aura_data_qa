'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    queryInterface.addColumn('Users', 'activationNonce', {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
    })
    queryInterface.addColumn('Users', 'activationExpiry', {
        type: Sequelize.DATE,
        allowNull: true
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'active')
    queryInterface.removeColumn('Users', 'activationNonce')
    queryInterface.removeColumn('Users', 'activationExpiry')
  }
};
