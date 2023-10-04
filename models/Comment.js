// Import necessary modules and dependencies
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Initialize the Comment model by extending off Sequelize's Model class
class Comment extends Model {}

// Define the Comment model attributes and rules
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // Reference the "user" model
        key: "id", // Using the "id" column as the foreign key
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post", // Reference the "post" model
        key: "id", // Using the "id" column as the foreign key
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps (createdAt)
    freezeTableName: true, // Prevent table name pluralization
    underscored: true, // Use underscores instead of camelCase for column names
    modelName: "comment", // Set the model name to "comment"
  }
);

// Export the Comment model for use in other parts of the application
module.exports = Comment;
