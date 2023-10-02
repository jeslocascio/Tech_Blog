// Import necessary modules and dependencies.
const { Model, DataTypes } = require('sequelize'); // Import Sequelize model and DataTypes.
const bcrypt = require('bcrypt'); // Import the bcrypt library for password hashing.
const sequelize = require('../config/connection'); // Import the database connection.

// Define the User model by extending the Sequelize Model class.
class User extends Model {
  // Method to check if a provided password matches the stored password hash.
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its properties and constraints.
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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Ensure the password has a minimum length of 8 characters.
      },
    },
  },
  {
    hooks: {
      // Hook that executes before creating a new user record.
      beforeCreate: async (newUserData) => {
        // Hash the user's password before storing it in the database.
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the password with a salt factor of 10.
        return newUserData;
      },
    },
    sequelize,            // Pass the database connection instance.
    timestamps: false,    // Disable timestamps (created_at and updated_at columns).
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name.
    underscored: true,    // Use underscores in column names (e.g., username).
    modelName: 'user',   // Name of the model in singular form.
  }
);

// Export the User model so it can be used in other parts of your application.
module.exports = User;
