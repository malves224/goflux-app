'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shippers', [
      {
        "name": "goFlux Brasil",
        "doc": "60429484000110",
        "about": "goFlux, uma empresa especializada em inovar na contratação de fretes",
        "active": true,
        "site": "https://goflux.com.br/"      
      },
      {
        "name": "Milho é vida.",
        "doc": "30229184000155",
        "about": "Milho é vida, qualidade com preço justo.",
        "active": true,
        "site": "https://milho.com.br/"      
      },
      {
        "name": "Rei do café.",
        "doc": "25229489000199",
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
