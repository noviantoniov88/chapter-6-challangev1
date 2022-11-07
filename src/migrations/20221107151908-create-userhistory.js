'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Userhistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usergame_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: 'Usergames',
            schema: 'public'
          },
          key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER
      },
      lastlogin: {
        type: Sequelize.DATE
      },
      finishplayed: {
        type: Sequelize.DATE
      },
      countattempt: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Userhistories');
  }
};