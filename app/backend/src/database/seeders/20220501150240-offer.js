'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('offers',[
      {
        "id_customer": 1,
        "from": "Porto Alegre - RS",
        "to": "São Paulo - SP",
        "initial_value": 5000.00,
        "amount": 100.00,
        "amount_type": "TON"
      },
      {
        "id_customer": 1,
        "from": "Oiapoque - AP",
        "to": "Chui - RS",
        "initial_value": 15000.00,
        "amount": 250.00,
        "amount_type": "TON"
      },
      {
        "id_customer": 1,
        "from": "Porto Alegre - RS",
        "to": "Santos - SP",
        "initial_value": 9000.00,
        "amount": 140.00,
        "amount_type": "TON"
      },
      {
        "id_customer": 1,
        "from": "Porto Alegre - RS",
        "to": "Santos - SP",
        "initial_value": 9000.00,
        "amount": 160.00,
        "amount_type": "TON"
      },
      {
        "id_customer": 2,
        "from": "Santos - SP",
        "to": "Salvador - BA",
        "initial_value": 15000.00,
        "amount": 180.00,
        "amount_type": "TON"
      },
      {
        "id_customer": 2,
        "from": "São Paulo - SP",
        "to": "Fortaleza - CE",
        "initial_value": 20000.00,
        "amount": 200.00,
        "amount_type": "TON"
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('offers', null, {});
  }
};
