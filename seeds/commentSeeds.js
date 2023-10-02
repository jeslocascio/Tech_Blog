const { Comment } = require("../models");

const commentsWritten = [
  {
    comment: "Can you explain this to me in a private message?",
    user_id: 2,
    post_id: 1,
  },
  {
    comment: "This makes perfect sense, thank you!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment: "This will be my default set up from now on.",
    user_id: 3,
    post_id: 3,
  },
];

const seedComments = () => Comment.bulkCreate(commentsWritten);

module.exports = seedComments;