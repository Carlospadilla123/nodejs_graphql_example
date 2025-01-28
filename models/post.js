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

module.exports = Post;