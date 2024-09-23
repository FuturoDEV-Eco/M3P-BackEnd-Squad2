'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('collection_points', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(180),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      recycle_types: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      postalcode: {
        type: Sequelize.STRING(8),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(180),
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false
      },
      number: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      complement: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      map_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'CASCADE'
        },
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('collection_points');
  }
};
