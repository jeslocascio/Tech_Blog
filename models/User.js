// Import necessary Sequelize modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Initialize the User model by extending Sequelize's Model class
class User extends Model {
  // Method to check if the provided password matches the stored hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define the attributes and rules for the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure usernames are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6], // Ensure the password length is at least 6 characters
      },
    },
  },
  {
    hooks: {
      // Hash the password before creating a new user record
      beforeCreate: async (hashPassword) => {
        hashPassword.password = await bcrypt.hash(hashPassword.password, 10);
        return hashPassword;
      },
    },
    sequelize,             // Use the defined Sequelize instance
    timestamps: false,     // Disable timestamp fields (createdAt, updatedAt)
    freezeTableName: true, // Prevent table name pluralization
    underscored: true,     // Use snake_case for column names
    modelName: "user",     // Define the model name
  }
);

// Export the User model
module.exports = User;
