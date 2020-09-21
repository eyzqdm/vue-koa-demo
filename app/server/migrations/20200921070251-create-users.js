'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      password: {
        type: Sequelize.CHAR(32),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin'
    }).then(() => {
      return queryInterface.addIndex('users', {
        name: 'username', // 索引名
        unique: true,
        fields: ['username'] // 关联属性
      });
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};