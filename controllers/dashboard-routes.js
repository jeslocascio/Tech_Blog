// Import necessary modules and dependencies
const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to display the user's dashboard with their posts
router.get("/", withAuth, async (req, res) => {
  try {
    // Find all posts by the currently logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    
    // Map the post data to plain objects for rendering
    const posts = postData.map((post) => post.get({ plain: true }));
    
    // Render the dashboard template with posts and session information
    return res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Route to display a single post from the user's dashboard
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Find a specific post by its ID, including user information
    const onePost = await Post.findByPk(req.params.id, {
      include: [User],
    });
    
    // Get the post data as a plain object for rendering
    const post = onePost.get({ plain: true });

    // Render the single-post-dash template with the post and user ID
    return res.render("single-post-dash", {
      post,
      user_id: req.session.user_id,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Export the router for use in other parts of the application
module.exports = router;
