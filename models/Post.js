// Import necessary Sequelize modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Initialize the Post model by extending Sequelize's Model class
class Post extends Model {}

// Define the attributes and rules for the Post model
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
      validate: {
        len: [8], // Ensure the title length is at least 8 characters
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Ensure the content length is at least 8 characters
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // Reference the "user" model
        key: "id",     // Using the "id" attribute as the foreign key
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,             // Use the defined Sequelize instance
    timestamps: false,     // Disable timestamp fields (createdAt, updatedAt)
    freezeTableName: true, // Prevent table name pluralization
    underscored: true,     // Use snake_case for column names
    modelName: "post",     // Define the model name
  }
);

// Export the Post model
module.exports = Post;
