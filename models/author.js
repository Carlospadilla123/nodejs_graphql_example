

const { DataTypes } = require('sequelize');
const db = require('../utils/db');


const Author = db.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

Author.associate = (models) => {
  Author.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
  Author.hasMany(models.Post, {
    foreignKey: "authorId",
    as: "posts",
  });
};

module.exports = Author;