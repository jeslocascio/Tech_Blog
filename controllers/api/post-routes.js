// Import necessary modules and dependencies
const router = require("express").Router();
const { Post } = require("../../models");

// POST route to create a new post
router.post("/", async (req, res) => {
  try {
    // Check if content is provided in the request body
    if (!req.body.content) {
      return res.status(400).json({ message: "Content is required." });
    }

    // Create a new post
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    // Send the new post as a JSON response
    res.json(newPost);
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// PUT route to update an existing post by ID
router.put("/:id", async (req, res) => {
  try {
    console.log(req.body, req.params.id);

    // Update the post with the provided ID
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Send the updated post as a JSON response
    res.json(updatePost);
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// DELETE route to delete an existing post by ID
router.delete("/:id", async (req, res) => {
  try {
    // Delete the post with the provided ID
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Send a JSON response indicating the success of deletion
    res.json(deletePost);
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    res.status(500).json(error);
  }
});

// Export the router for use in other parts of the application
module.exports = router;

