'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shippers', [
      {
        "id": 1,
        "name": "goFlux Brasil",
        "doc": "60.429.484/0001-10",
        "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
        "active": true,
        "site": "https://goflux.com.br/"      
      },
      {
        "id": 2,
        "name": "Milho é vida.",
        "doc": "30.229.184/0001-55",
        "about": "Milho é vida, qualidade com preço justo.",
        "active": true,
        "site": "https://milho.com.br/"      
      },
      {
        "id": 3,
        "name": "Rei do café.",
        "doc": "25.229.489/0001-99",
        "about": "O café do rei.",
        "active": true,
        "site": "https://querocafe.com.br/"      
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shippers', null, {});
  }
};
