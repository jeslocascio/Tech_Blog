// Middleware function to check if a user is authenticated.
const withAuth = (req, res, next) => {
  // If the user is not logged in (session does not have a 'logged_in' property set to true), redirect the request to the login route.
  if (!req.session.logged_in) {
    res.redirect('/login'); // Redirect to the login page.
  } else {
    // If the user is logged in, continue to the next middleware or route handler.
    next(); // Call the next middleware or route handler in the chain.
  }
};

// Export the withAuth middleware so it can be used in other parts of your application.
module.exports = withAuth;