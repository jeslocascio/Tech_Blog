// Import necessary modules and dependencies
const router = require("express").Router();
const dashboardRoutes = require("./dashboard-routes");
const homeRoutes = require("./homepage-routes");
const apiRoutes = require("./api");

// Use routes for the homepage, dashboard, and API
router.use("/", homeRoutes); // Use homepage routes for the root path
router.use("/dashboard", dashboardRoutes); // Use dashboard routes for /dashboard
router.use("/api", apiRoutes); // Use API routes for /api

// Handle any other routes with a "Wrong Route!" message
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

// Export the router for use in other parts of the application
module.exports = router;
