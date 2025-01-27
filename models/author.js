

const { DataTypes } = require('sequelize');
const db = require('../utils/db');
const User = require('./user');


const Author = db.define('Author', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

module.exports = Author;