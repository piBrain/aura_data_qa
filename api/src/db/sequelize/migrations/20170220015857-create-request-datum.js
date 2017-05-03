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
        type: Sequelize.STRING,
        allowNull: false
      },
      data: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {}
      },
      form: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: {}
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      found_at: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      },
      validated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      prioritized: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('RequestData');
  }
};
