'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    value: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Response, { foreignKeyConstraint: true, foreignKey: 'categoryId' });
      }
    }
  });
  return Category;
};
