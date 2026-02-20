'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoriesListItems', {
      category_list_item_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      item_name: {
        type: Sequelize.STRING
      },
      image_name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      discount_price: {
        type: Sequelize.DECIMAL
      },
      ratings: {
        type: Sequelize.INTEGER
      },
      send_items_count: {
        type: Sequelize.INTEGER
      },
      category_list_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CategoriesListItems');
  }
};