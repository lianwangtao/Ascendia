'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var p1 = queryInterface.addColumn(
      'Users',
      'lastAccessImageId',
      Sequelize.INTEGER,
    )
    return Promise.all([p1])
  },

  down: (queryInterface, Sequelize) => {
    var p1 = queryInterface.removeColumn('Users', 'lastAccessImageId')
    return Promise.all([p1])
  }
};
