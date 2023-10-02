// Import the Sequelize library for working with databases.
const Sequelize = require('sequelize');

// Import the dotenv library for loading environment variables from a .env file.
require('dotenv').config();

// Create a Sequelize instance named 'sequelize'.
const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
        // If JAWSDB_URL is not set, use these environment variables for configuration.
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",  // Database server hostname (in this case, localhost).
            dialect: "mysql",   // The database dialect (MySQL in this case).
            dialectOptions: {
                decimalNumbers: true,  // Enable support for decimal numbers.
            },
        }
    );

// Export the configured Sequelize instance for use in other parts of your application.
module.exports = sequelize;