'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Usergames",[
      {
        username: 'usertest',
        password: '$2a$12$wc.b9lpet.30mFAh13B63OQPUgbEoufeG3R2QffgHS0EP4VpfSehu',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Usergames", {username:'usertest'});
    
  }
};
