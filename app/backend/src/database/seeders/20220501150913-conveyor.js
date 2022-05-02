'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('conveyors', [
      {
        "name": "Transportadora Rodoclub",
        "doc": "99.974.145/0001-50",
        "about": "Transportadora Rodoclub, transportando sonhos",
        "active": true,
        "site": "https://goflux.com.br/"      
      },
      {
        "name": "Transportadora 8 rodas",
        "doc": "56.910.145/0001-88",
        "about": "Transportadora 8 rodas, transportando sonhos",
        "active": true,
        "site": "https://goflux.com.br/"      
      },
      {
        "name": "Transportadora Rodoexpress",
        "doc": "56.910.145/0001-88",
        "about": "Transportadora Rodoexpress, transportando sonhos",
        "active": true,
        "site": "https://goflux.com.br/"      
      },
      {
        "name": "Transportadora ponta a ponta",
        "doc": "60.310.179/0001-88",
        "about": "Transportadora ponta a ponta, transportando sonhos",
        "active": false,
        "site": "https://goflux.com.br/"      
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('conveyors', null, {});
  }
};
