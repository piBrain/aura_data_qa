'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'signInType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'password'
    })
    queryInterface.addColumn('Users', 'inPasswordReset', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'password')
    queryInterface.removeColumn('Users', 'signInType')
    queryInterface.removeColumn('Users', 'inPasswordReset')
  }
};
