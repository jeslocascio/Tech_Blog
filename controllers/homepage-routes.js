// Import necessary modules and dependencies
const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// Route to display the homepage
router.get("/", async (req, res) => {
  try {
    // Find all posts with associated user information
    const posts = await Post.findAll({
      include: [User],
    });

    // Convert posts to JSON format
    const postData = posts.map((post) => post.toJSON());

    // Determine whether a user is logged in
    const loggedIn = req.session.user_id ? true : false;

    // Render the homepage template with post data and session information
    res.render("homepage", {
      postData,
      loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Route to display a single post
router.get("/post/:id", async (req, res) => {
  try {
    // Find a specific post by its ID, including user and comment information
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: "password",
          },
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: {
                exclude: "password",
              },
            },
          ],
        },
      ],
    });

    // Get the post data as a plain object for rendering
    const post = onePost.get({ plain: true });

    // Render the single-post template with the post and session information
    res.render("single-post", {
      post,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Route to display the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Export the router for use in other parts of the application
module.exports = router;
