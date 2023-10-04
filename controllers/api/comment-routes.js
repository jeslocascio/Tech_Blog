// Import necessary modules and dependencies
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to create a new comment
router.post("/", withAuth, async (req, res) => {
  try {
    // Check if a user session exists
    if (req.session) {
      // Create a new comment in the database
      const newComment = await Comment.create({
        comment: req.body.comment,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      
      // Send a JSON response with the newly created comment
      res.json(newComment);
    }
  } catch (error) {
    console.error(error);
    // Handle internal server error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE route to delete a comment by its ID
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the comment from the database based on its ID
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    
    // Send a JSON response with the deleted comment
    res.json(deleteComment);
  } catch (error) {
    // Handle errors and respond with an error status
    res.status(500).json(error);
  }
});

// Export the router for use in other parts of the application
module.exports = router;

