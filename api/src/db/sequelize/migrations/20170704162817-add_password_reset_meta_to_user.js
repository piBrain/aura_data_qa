'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Users', 'locked', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
    queryInterface.addColumn('Users', 'resetToken', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    })
    queryInterface.addColumn('Users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false,
    })
    queryInterface.addColumn('Users', 'resetExpiry', {
      type: Sequelize.DATE,
      allowNull: true,
    })
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Users', 'locked')
    queryInterface.removeColumn('Users', 'resetToken')
    queryInterface.removeColumn('Users', 'phoneNumber')
    queryInterface.removeColumn('Users', 'resetExpiry')
  }
};
