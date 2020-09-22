'use strict';
module.exports = (sequelize, Sequelize) => {
  const Comments = sequelize.define('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER(10)
    },
    content_id: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      references: {
        model: "Contents",
        key: 'id'
      }
    },
    user_id: {
      type: Sequelize.INTEGER(10),
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    },
    content: {
      type: Sequelize.STRING(1000),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: 0
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    tableName: 'comments'
  });
  Comments.associate = function(models) {
    // associations can be defined here

    Comments.belongsTo(models.Contents, {
      foreignKey: 'content_id'
    });

    Comments.belongsTo(models.Users, {
      foreignKey: 'user_id'
    });
  };
  return Comments;
};