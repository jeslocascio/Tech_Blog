// Import the Comment, Post, and User models
const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

// Define the associations between models

// A Post belongs to a User, and the foreign key is "user_id"
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a User is deleted, their associated Posts are also deleted
});

// A Post has many Comments, and the foreign key is "post_id"
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// A Comment belongs to a Post, and the foreign key is "post_id"
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// A User has many Posts, and the foreign key is "user_id"
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a User is deleted, their associated Posts are also deleted
});

// A Comment belongs to a User, and the foreign key is "user_id"
Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a User is deleted, their associated Comments are also deleted
});

// Export the models and their associations
module.exports = { Comment, Post, User };
