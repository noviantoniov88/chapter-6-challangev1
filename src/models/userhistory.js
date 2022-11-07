'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userhistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Userhistory.belongsTo(models.Usergame,{
        foreignKey: 'usergame_id'
      });
    }
  }
  Userhistory.init({
    usergame_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    lastlogin: DataTypes.DATE,
    finishplayed: DataTypes.DATE,
    countattempt: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Userhistory',
  });
  return Userhistory;
};