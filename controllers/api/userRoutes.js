// Import necessary modules and dependencies.
const router = require('express').Router();  // Express router for defining routes.
const { User } = require('../../models');    // Import the User model.

// Define a POST route for creating a new user.
router.post('/', async (req, res) => {
  try {
    // Create a new user using the User model and data from the request body.
    const userData = await User.create(req.body);

    // Save user session information (user_id and logged_in) and respond with a status code of 200 (OK) and the user data as JSON.
    req.session.save(() => {
      req.session.user_id = userData.id;    // Set the user_id in the session.
      req.session.logged_in = true;         // Set logged_in in the session to true.

      res.status(200).json(userData);        // Respond with user data as JSON.
    });
  } catch (err) {
    // If an error occurs during user creation, respond with a status code of 400 (Bad Request) and the error as JSON.
    res.status(400).json(err);
  }
});

// Define a POST route for user login.
router.post('/login', async (req, res) => {
  try {
    // Find a user by their email in the User model.
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Check if no user with the provided email was found.
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password matches the stored password hash for the user.
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is invalid, respond with an error message.
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user session information (user_id and logged_in) and respond with a status code of 200 (OK) and a success message.
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    // If an error occurs during the login process, respond with a status code of 400 (Bad Request) and the error as JSON.
    res.status(400).json(err);
  }
});

// Define a POST route for user logout.
router.post('/logout', (req, res) => {
  // Check if the user is logged in.
  if (req.session.logged_in) {
    // If logged in, destroy the session and respond with a status code of 204 (No Content).
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If not logged in, respond with a status code of 404 (Not Found).
    res.status(404).end();
  }
});

// Export the router so it can be used in other parts of your application.
module.exports = router;
