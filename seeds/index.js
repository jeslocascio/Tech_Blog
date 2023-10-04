// Import the seed functions for users, posts, and comments from their respective files.
const seedComments = require("./comment-seeds");
const seedPosts = require("./post-seeds");
const seedUsers = require("./user-seeds");

// Import the Sequelize instance for database connection.
const sequelize = require("../config/connection");

// Create an asynchronous function named seedAll to seed the database with data.
const seedAll = async () => {
  try {
    // Synchronize the database by dropping and re-creating tables if "force" is set to true.
    await sequelize.sync({ force: true });
    console.log("\n---- DATABASE SYNCED ----\n");

    // Seed the users by invoking the seedUsers function.
    await seedUsers();
    console.log("\n---- USERS SEEDED ----\n");

    // Seed the posts by invoking the seedPosts function.
    await seedPosts();
    console.log("\n---- POSTS SEEDED ----\n");

    // Seed the comments by invoking the seedComments function.
    await seedComments();
    console.log("\n---- COMMENTS SEEDED ----\n");
  } catch (error) {
    // Handle any errors that occur during the seeding process.
    console.error("Error seeding database: ", error);
  }

  // Exit the Node.js process to finish the seeding operation.
  process.exit(0);
};

// Call the seedAll function to start the database seeding process.
seedAll();
