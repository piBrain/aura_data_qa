'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "RequestDatumCommandExamples" ADD UNIQUE (request_datum_id, command_example_id)'
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "RequestDatumCommandExamples" DROP CONSTRAINT "RequestDatumCommandExamples_request_datum_id_command_exampl_key"'
    );
  }
};
