'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bids', [
      {
        "id_provider": 1,
        "id_offer": 1,
        "value": 5800.00,
        "amount": 100.00      
      },
      {
        "id_provider": 2,
        "id_offer": 1,
        "value": 5000.00,
        "amount": 85.00      
      },
      {
        "id_provider": 3,
        "id_offer": 1,
        "value": 3000.00,
        "amount": 50.00      
      },
      {
        "id_provider": 1,
        "id_offer": 2,
        "value": 18000.00,
        "amount": 250.00
      },
      {
        "id_provider": 2,
        "id_offer": 2,
        "value": 12500.00,
        "amount": 115.00
      },
      {
        "id_provider": 1,
        "id_offer": 3,
        "value": 7000.00,
        "amount": 130.00
      },
      {
        "id_provider": 2,
        "id_offer": 3,
        "value": 10100.00,
        "amount": 160.00
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bids', null, {});
  }
};
