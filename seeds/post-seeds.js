// Import the Post model from the models folder.
const { Post } = require("../models");

// Create an array of post data, where each object represents a post with title, content, and user_id.
const postData = [
  {
    title: "This is why I love JavaScript",
    content:
      "It is such an awesome way to code, and it makes me feel like a hacker from a movie.",
    user_id: 1,
  },
  {
    title: "Handlebars are so cool",
    content:
      "Not only do they make coding easier, but they have a little mustache icon",
    user_id: 2,
  },
  {
    title: "Here is why you should become a programmer",
    content:
      "Coding is honestly just a lot of fun. Those little Aha moments make it so worth it.",
    user_id: 3,
  },
];

// Define a function named seedPosts to bulk create posts in the database using the postData array.
const seedPosts = () => Post.bulkCreate(postData);

// Export the seedPosts function to be used in other files.
module.exports = seedPosts;
