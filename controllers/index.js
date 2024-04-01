// Purpose: This file is the entry point for all routes in the application. It imports the routes from the homeController and api folders and exports them to the server.js file. This file is used to organize the routes in the application.

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeController');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
