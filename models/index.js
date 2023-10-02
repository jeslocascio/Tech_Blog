// Import the individual model files.
const Comment = require('./Comment'); // Import the Comment model.
const Post = require('./Post');       // Import the Post model.
const User = require('./User');       // Import the User model.

// Define associations between models to establish relationships in the database.
Post.hasMany(Comment, {
    foreignKey: 'post_id', // Define the foreign key column in the Comment model.
    onDelete: 'CASCADE'   // Specify cascading deletion (delete associated comments when a post is deleted).
});

Post.belongsTo(User, {
    foreignKey: 'user_id' // Define the foreign key column in the Post model.
});

User.hasMany(Post, {
    foreignKey: 'user_id', // Define the foreign key column in the Post model.
    onDelete: 'CASCADE'   // Specify cascading deletion (delete associated posts when a user is deleted).
});

User.hasMany(Comment, {
    foreignKey: 'user_id' // Define the foreign key column in the Comment model.
});

Comment.belongsTo(User, {
    foreignKey: 'user_id' // Define the foreign key column in the Comment model.
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id' // Define the foreign key column in the Comment model.
});

// Export all models and their associations as an object.
module.exports = { Comment, Post, User };
