'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('offers',[
      {
        "id": 1,
        "id_customer": 1,
        "from": "Porto Alegre - RS",
        "to": "São Paulo - SP",
        "initial_value": 130.00,
        "amount": 300.00,
        "amount_type": "TON"
      },
      {
        "id": 2,
        "id_customer": 1,
        "from": "Oiapoque - AP",
        "to": "Chui - RS",
        "initial_value": 1030.00,
        "amount": 250.00,
        "amount_type": "TON"
      },
      {
        "id": 3,
        "id_customer": 2,
        "from": "Porto Alegre - RS",
        "to": "Santos - SP",
        "initial_value": 500.00,
        "amount": 160.00,
        "amount_type": "TON"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('offers', null, {});
  }
};
