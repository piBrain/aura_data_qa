'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "CommandExamples" ADD UNIQUE (request_datum_id, text)'
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(
      'ALTER TABLE "CommandExamples" DROP CONSTRAINT "CommandExamples_request_datum_id_text_key"'
    );
  }
};
