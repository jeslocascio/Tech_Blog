// Import necessary modules and dependencies.
const router = require('express').Router();  // Express router for defining routes.
const { Project } = require('../../models');  // Import the Project model.
const withAuth = require('../../utils/auth');  // Import a custom authentication middleware.

// Define a POST route for creating a new project.
router.post('/', withAuth, async (req, res) => {
  try {
    // Create a new project using the Project model and data from the request body.
    const newProject = await Project.create({
      ...req.body,          // Spread the request body into the project data.
      user_id: req.session.user_id,  // Set the user_id based on the logged-in user's session.
    });

    // Respond with a status code of 200 (OK) and the newly created project as JSON.
    res.status(200).json(newProject);
  } catch (err) {
    // If an error occurs during project creation, respond with a status code of 400 (Bad Request) and the error as JSON.
    res.status(400).json(err);
  }
});

// Define a DELETE route for deleting a project by its ID.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // Attempt to delete a project with the specified ID and user_id from the Project model.
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,              // Match the project's ID from the route parameters.
        user_id: req.session.user_id,   // Ensure the user attempting to delete the project is the owner.
      },
    });

    // Check if any project was deleted. If not, respond with a 404 (Not Found) status and an error message.
    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    // Respond with a status code of 200 (OK) and the deleted project data as JSON.
    res.status(200).json(projectData);
  } catch (err) {
    // If an error occurs during project deletion, respond with a status code of 500 (Internal Server Error) and the error as JSON.
    res.status(500).json(err);
  }
});

// Export the router so it can be used in other parts of your application.
module.exports = router;
