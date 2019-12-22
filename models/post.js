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
      UserId: DataTypes.INTEGER
    },
    {}
  );
  Post.associate = function (_models) {
    // associations can be defined here
  };
  return Post;
};
