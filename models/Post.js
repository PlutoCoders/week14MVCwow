// This is the backend implementation for handling the post data by defining the structure of a Post and managing its interactions with the database.
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// our posts have two main data points: the input (string) in the title, and the body, which the user creates with the newPost.js
Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize,
    // need this otherwise inflection happens, we want to work with un inflected tables
    freezeTableName: true,
  }
);

module.exports = Post;
