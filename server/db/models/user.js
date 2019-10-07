'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    activation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    nda: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lastAccessImageId: {
      type: DataTypes.INTEGER,
    },
    firstTimeLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    numImageSeen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Response, { foreignKeyConstraint: true, foreignKey: 'userId' });
        User.hasMany(models.UserConfig, { foreignKeyConstraint: true, foreignKey: 'userId' });
      }
    }
  });
  return User;
};
