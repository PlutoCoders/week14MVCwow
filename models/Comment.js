const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Here we are again etending a model class, so that we can build on existing code/framework
class Comment extends Model {}
// Representing the comment model in the application

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
     // need this otherwise inflection happens, we want to work with un inflected tables
    freezeTableName: true,
  }
);

module.exports = Comment;