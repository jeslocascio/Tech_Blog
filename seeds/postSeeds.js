const {Post} = require('../models');

const postsWritten = [
    {
        title: "How Handlebars Work",
        content: "In this post, I am explaining how to use the Handlebars framework.",
        user_id: 1,
    },
    {
        title: "The Wonderful World of JavaScript",
        content: "This is JavaScript, and why you should like it.",
        user_id: 2,
    },
    {
        title: "This CSS Set Up is Perfect for All Projects",
        content: "Here is all you need for well-rounded css",
        user_id: 3,
    },
  ];
  
  const seedPosts = () => Post.bulkCreate(postsWritten);
  
  module.exports = seedPosts;