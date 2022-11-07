'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usergame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usergame.hasOne(models.Userbiodata, {
        foreignKey: 'usergame_id'
      });
      Usergame.hasMany(models.Userhistory, {
        foreignKey: 'usergame_id'
      });
    }
  }
  Usergame.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Usergame',
  });
  return Usergame;
};