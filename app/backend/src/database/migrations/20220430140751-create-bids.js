'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bids', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_provider: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'conveyors',
          key: 'id'
        }
      },
      id_offer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'offers',
          key: 'id'
        }
      },
      value: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(9,2),
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bids');
  }
};