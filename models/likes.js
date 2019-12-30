"use strict";
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {
    checked: DataTypes.BOOLEAN
  });
  Likes.associate = function(models) {
    Likes.belongsTo(models.User, {
      foreignKey: {
        name: "userID"
      }
    });
  };

  Likes.associate = function(models) {
    Likes.belongsTo(models.Post, {
      foreignKey: {
        name: "PostId"
      }
    });
  };

  return Likes;
};
