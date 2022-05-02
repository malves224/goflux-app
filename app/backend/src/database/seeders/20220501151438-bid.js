'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bids', [
      {
        "id": 1,
        "id_provider": 10,
        "id_offer": 1,
        "value": 150.00,
        "amount": 300.00      
      },
      {
        "id": 2,
        "id_provider": 11,
        "id_offer": 1,
        "value": 140.00,
        "amount": 300.00      
      },
      {
        "id": 3,
        "id_provider": 12,
        "id_offer": 1,
        "value": 120.00,
        "amount": 250.00      
      },
      {
        "id": 4,
        "id_provider": 12,
        "id_offer": 2,
        "value": 1200.00,
        "amount": 250.00      
      },
      {
        "id": 5,
        "id_provider": 10,
        "id_offer": 2,
        "value": 1150.00,
        "amount": 250.00      
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bids', null, {});
  }
};
