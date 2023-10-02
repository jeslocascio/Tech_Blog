// Import necessary modules and dependencies.
const { Model, DataTypes } = require('sequelize'); // Import Sequelize model and DataTypes.
const sequelize = require('../config/connection'); // Import the database connection.

// Define the Post model by extending the Sequelize Model class.
class Post extends Model {}

// Initialize the Post model with its properties and constraints.
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    data_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',  // References the "user" model.
        key: 'id',      // Refers to the "id" column in the "user" model.
      },
    },
  },
  {
    sequelize,            // Pass the database connection instance.
    timestamps: false,    // Disable timestamps (created_at and updated_at columns).
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name.
    underscored: true,    // Use underscores in column names (e.g., data_created).
    modelName: 'post',   // Name of the model in singular form.
  }
);

// Export the Post model so it can be used in other parts of your application.
module.exports = Post;
