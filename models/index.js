const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany (Post, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});
 Post.belongsTo (User, {
  foreignKey: 'id'
});

Post.hasMany(Comment, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(Post, {
  foreignKey: 'id'
});

User.hasMany(Comment, {
  foreignKey: 'id',
  onDelete: 'CASCADE'
});
Comment.belongsTo(User, {
  foreignKey: 'id'
});

module.exports = { User, Post, Comment };
