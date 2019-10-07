'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var p1 = queryInterface.addColumn(
      'Users',
      'numImageSeen',
      Sequelize.INTEGER,
    )
    return Promise.all([p1])
  },

  down: function (queryInterface, Sequelize) {
    var p1 = queryInterface.removeColumn('Users', 'numImageSeen')
    return Promise.all([p1])
  }
};
