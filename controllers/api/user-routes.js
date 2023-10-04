// Import necessary modules and dependencies
const router = require("express").Router();
const { User } = require("../../models");

// Route to sign up a new user
router.post("/signup", async (req, res) => {
  try {
    // Create a new user with the provided user data
    const userData = await User.create(req.body);
    
    // Save user session information
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json(userData);
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Route to log in an existing user
router.post("/login", async (req, res) => {
  try {
    // Find the user by their username
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    
    // If no user is found, return a 404 Not Found response
    if (!userData) {
      res.status(404).json({ message: "No user found" });
      return;
    }
    
    // Check if the provided password is valid
    const validPassword = userData.checkPassword(req.body.password);
    
    // If the password is invalid, return a 404 Not Found response
    if (!validPassword) {
      res.status(404).json({ message: "No user found" });
      return;
    }
    
    // Save user session information
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json(userData);
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Route to log out a user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the user session and send a 204 No Content response
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
});

// Export the router for use in other parts of the application
module.exports = router;

