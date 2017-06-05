'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "SiteRequestData" ADD UNIQUE (request_datum_id, site_id)'
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "SiteRequestData" DROP CONSTRAINT "SiteRequestData_request_datum_id_site_id_key"'
    );
  }
};
