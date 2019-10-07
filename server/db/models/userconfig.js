'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserConfig = sequelize.define('UserConfig', {
    activation: DataTypes.BOOLEAN,
    nda: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        UserConfig.belongsTo(models.User, { foreignKeyConstraint: true, foreignKey: 'userId' });
      }
    }
  });
  return UserConfig;
};