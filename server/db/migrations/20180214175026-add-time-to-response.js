'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var p1 = queryInterface.addColumn(
      'Responses',
      'time',
      Sequelize.DOUBLE,
    )

    return Promise.all([p1])
  },

  down: (queryInterface, Sequelize) => {
    var p1 = queryInterface.removeColumn('Responses', 'time')
    return Promise.all([p1])
  }
};
