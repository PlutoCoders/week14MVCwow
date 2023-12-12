const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

Post.belongsTo(User, {
  foreignKey: 'userId',
   // we use CASCADE so that all related data is removed when a parent record is deleted
  onDelete: 'CASCADE'
});

// setup post and comment
// remember to export it just as we export User

module.exports = User;