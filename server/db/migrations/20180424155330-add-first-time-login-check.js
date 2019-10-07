'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var p1 = queryInterface.addColumn(
      'Users',
      'firstTimeLogin',
      Sequelize.BOOLEAN,
    )
    return Promise.all([p1])
  },

  down: function (queryInterface, Sequelize) {
    var p1 = queryInterface.removeColumn('Users', 'firstTimeLogin')
    return Promise.all([p1])
  }
};
