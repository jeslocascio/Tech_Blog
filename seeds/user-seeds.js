// Import the User model from the models folder.
const { User } = require("../models");

// Create an array of user data, where each object represents a user with a username and password.
const userData = [
  {
    username: "Coding_4_Fun",
    password: "W0W_H4H4",
  },
  {
    username: "Nerd_1234",
    password: "1337_Talk",
  },
  {
    username: "xX_Haxorz_Xx",
    password: "aeiou&y_",
  },
  {
    username: "nyancat",
    password: "meowmeow",
  },
  {
    username: "tech_deck",
    password: "Wow_I_Am_Cool",
  },
];

// Define a function named seedUsers to bulk create users in the database using the userData array.
const seedUsers = () =>
  User.bulkCreate(userData, {
    individualHooks: true, // Use individual hooks for each user (e.g., hashing passwords).
    returning: true, // Return the created user data.
  });

// Export the seedUsers function to be used in other files.
module.exports = seedUsers;

