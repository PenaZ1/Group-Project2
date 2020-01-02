"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      text: DataTypes.STRING,
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      UserId: DataTypes.INTEGER,
      nsfw: DataTypes.BOOLEAN
    },
    {}
  );
  Post.associate = function(models) {
    Post.hasMany(models.Likes, {
      onDelete: "cascade"
    });
  };
  return Post;
};