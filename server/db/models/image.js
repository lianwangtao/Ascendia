'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    url: DataTypes.STRING,
    preCategory: DataTypes.STRING,
    preDescription: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Image.hasMany(models.Response, { foreignKeyConstraint: true, foreignKey: 'imageId' });
      }
    }
  });
  return Image;
};
