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
      id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.TIME
      },
      updated_at: {
        type: Sequelize.TIME
      },
      parsed_request: {
        type: Sequelize.STRING
      },
      method: {
        type: Sequelize.INTEGER
      },
      data: {
        type: Sequelize.JSON
      },
      form: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('RequestData');
  }
};