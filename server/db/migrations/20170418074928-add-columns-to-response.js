'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    var p1 = queryInterface.addColumn(
      'Responses',
      'userId',
      Sequelize.INTEGER
    )

    var p2 = queryInterface.addColumn(
      'Responses',
      'categoryId',
      Sequelize.INTEGER
    )

    var p3 = queryInterface.addColumn(
      'Responses',
      'imageId',
      Sequelize.INTEGER
    )

    return Promise.all([p1, p2, p3])
  },

  down(queryInterface, Sequelize) {
    var p1 = queryInterface.removeColumn('Responses', 'userId')
    var p2 = queryInterface.removeColumn('Responses', 'categoryId')
    var p3 = queryInterface.removeColumn('Responses', 'imageId')

    return Promise.all([p1, p2, p3])
  },
};
