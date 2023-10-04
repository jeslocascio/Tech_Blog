// Import the Comment model from "../models".
const { Comment } = require("../models");

// Define an array called commentData, where each element represents a comment object with properties like comment, user_id, and post_id.
const commentData = [
  {
    comment: "So true! I feel the same way!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment: "The icon is so cute!",
    user_id: 4,
    post_id: 2,
  },
  {
    comment: "I completely agree!",
    user_id: 5,
    post_id: 3,
  },
];

// Create a function seedComments that uses the bulkCreate method of the Comment model to insert the commentData array into the database.
const seedComments = () => Comment.bulkCreate(commentData);

// Export the seedComments function for use in your application.
module.exports = seedComments;
