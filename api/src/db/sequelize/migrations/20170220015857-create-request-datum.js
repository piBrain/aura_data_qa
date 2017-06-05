'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('RequestData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false
      },
      request: {
        type: Sequelize.STRING,
        allowNull: false
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '',
      },
      data: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      form: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('RequestData');
  }
};
