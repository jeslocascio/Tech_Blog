// Import necessary modules and dependencies.
const router = require('express').Router(); // Express router for defining routes.

// Import route modules for different parts of your application.
const apiRoutes = require('./api'); // Import API routes.
const homeRoutes = require('./homeRoutes'); // Import home routes.

// Define route handlers by mounting route modules to specific URL prefixes.
router.use('/', homeRoutes); // Mount the 'homeRoutes' module to the root URL.
router.use('/api', apiRoutes); // Mount the 'apiRoutes' module under the '/api' URL prefix.

// Export the router configuration so it can be used in other parts of your application.
module.exports = router;
