const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class User extends Model {
  checkPassword(loginPassword) {
     // Compare passwords
    return loginPassword === this.password;
  }
  // Note: What can we do to make password checking and storing more secure?
  // Tip: What is hashing?
}

// Here we set up the User model with its characteristics and configuration
User.init(
  {
    // Define the various properties of the User model which we will be using for our databse
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      // We want to validate so that the user has to type in more than 1 character, in this case we will check to see that they have atleast 3
      validate: {
        length:[3],
        allowNull: false,
      },
    },
  },
  {

    sequelize,
    // So that we can have underscored naming
    underscored: true,
    // The name of our specific model
    modelName: 'User',
  }
);

// Exporting the user structure above to be used elsewhere
module.exports = User;