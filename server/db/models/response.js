'use strict';
module.exports = function(sequelize, DataTypes) {
  var Response = sequelize.define('Response', {
    description: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    time: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        Response.belongsTo(models.User, { foreignKeyConstraint: true, foreignKey: 'userId' });
        Response.belongsTo(models.Category, { foreignKeyConstraint: true, foreignKey: 'categoryId' });
        Response.belongsTo(models.Image, { foreignKeyConstraint: true, foreignKey: 'imageId' });
      }
    }
  });
  return Response;
};
