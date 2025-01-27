

const { DataTypes } = require('sequelize');
const db = require('../utils/db');
const Author = require('./author');

const User = db.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = User;
