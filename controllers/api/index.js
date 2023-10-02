//Add Dependencies
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

// Uses userRoutes and projectRoutes to route endpoints
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

// Exports Router
module.exports = router;
