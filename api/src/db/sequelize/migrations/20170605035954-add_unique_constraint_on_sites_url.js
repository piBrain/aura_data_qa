'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "Sites" ADD UNIQUE (url)'
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "Sites" DROP CONSTRAINT "Sites_url_key"'
    );
  }
};
