// Import necessary modules and dependencies.
const { Model, DataTypes } = require('sequelize'); // Import Sequelize model and DataTypes.
const sequelize = require('../config/connection'); // Import the database connection.

// Define the Comment model by extending the Sequelize Model class.
class Comment extends Model {}

// Initialize the Comment model with its properties and constraints.
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",  // References the "user" model.
        key: "id",      // Refers to the "id" column in the "user" model.
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post",  // References the "post" model.
        key: "id",      // Refers to the "id" column in the "post" model.
      }
    },
  },
  {
    sequelize,            // Pass the database connection instance.
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name.
    underscored: true,    // Use underscores in column names (e.g., creation_date).
    modelName: 'comment', // Name of the model in singular form.
  }
);

// Export the Comment model so it can be used in other parts of your application.
module.exports = Comment;
