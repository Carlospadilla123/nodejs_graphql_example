const { DataTypes } = require('sequelize');
const db = require('../utils/db');

const Post = db.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

Post.associate = (models) => {
  Post.belongsTo(models.Author, {
    foreignKey: "authorId",
    as: "author",
  });
};

module.exports = Post;