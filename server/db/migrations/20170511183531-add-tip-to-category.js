'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    var p1 = queryInterface.addColumn(
      'Categories',
      'tip',
      Sequelize.TEXT
    )

    return Promise.all([p1])
  },

  down: function (queryInterface, Sequelize) {
    var p1 = queryInterface.removeColumn('Categories', 'tip')
    return Promise.all([p1])
  }
};
