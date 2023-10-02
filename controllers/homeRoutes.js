// Import necessary modules and dependencies.
const router = require('express').Router();  // Express router for defining routes.
const { Project, User } = require('../models'); // Import the Project and User models.
const withAuth = require('../utils/auth'); // Import a custom authentication middleware.

// Define a GET route for the homepage.
router.get('/', async (req, res) => {
  try {
    // Retrieve all projects from the database and include associated user data.
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize the data to make it accessible to templates.
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Render the 'homepage' template with serialized data and session flag indicating if the user is logged in.
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    // If an error occurs, respond with a status code of 500 (Internal Server Error) and the error as JSON.
    res.status(500).json(err);
  }
});

// Define a GET route for viewing a specific project by its ID.
router.get('/project/:id', async (req, res) => {
  try {
    // Retrieve a specific project by its ID and include associated user data.
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize the project data to make it accessible to templates.
    const project = projectData.get({ plain: true });

    // Render the 'project' template with serialized project data and session flag indicating if the user is logged in.
    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    // If an error occurs, respond with a status code of 500 (Internal Server Error) and the error as JSON.
    res.status(500).json(err);
  }
});

// Define a GET route for viewing the user's profile (requires authentication).
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged-in user based on the session ID, excluding the password attribute.
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    // Serialize the user data to make it accessible to templates.
    const user = userData.get({ plain: true });

    // Render the 'profile' template with serialized user data and set the 'logged_in' flag to true.
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    // If an error occurs, respond with a status code of 500 (Internal Server Error) and the error as JSON.
    res.status(500).json(err);
  }
});

// Define a GET route for the login page.
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect them to the profile page.
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Render the 'login' template for users who are not logged in.
  res.render('login');
});

// Export the router so it can be used in other parts of your application.
module.exports = router;
