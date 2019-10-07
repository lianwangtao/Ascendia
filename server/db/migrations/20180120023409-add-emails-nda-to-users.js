'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    var p1 = queryInterface.addColumn(
      'Users',
      'activation',
      Sequelize.BOOLEAN,
    )

    var p2 = queryInterface.addColumn(
      'Users',
      'nda',
      Sequelize.BOOLEAN,
    )

    return Promise.all([p1, p2])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    var p1 = queryInterface.removeColumn('Users', 'activation')
    var p2 = queryInterface.removeColumn('Users', 'nda')
    return Promise.all([p1, p2])
  }
};
