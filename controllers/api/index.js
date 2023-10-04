// Import necessary modules and dependencies
const router = require("express").Router();
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");

// Middleware for "/posts" routes
router.use("/posts", postRoutes);

// Middleware for "/comments" routes
router.use("/comments", commentRoutes);

// Middleware for "/users" routes
router.use("/users", userRoutes);

// Export the router for use in other parts of the application
module.exports = router;

