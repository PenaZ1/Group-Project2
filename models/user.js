"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {}
  );
  User.associate = function(_models) {
    // associations can be defined here
  };
  return User;
};
