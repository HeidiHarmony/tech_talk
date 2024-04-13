const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');
const homeController = require('../controllers/homeController');

// Routes for rendering views

// Route for rendering the home page
router.get('/', homeController.renderHome);

// Route for rendering the signUpIn view page
router.get('/signUpIn', homeController.renderSignUpIn);

// Route for rendering the dashboard view page
router.get('/dashboard', withAuth, homeController.renderDashboard);

// Route for rendering the post view page
router.get('/postView', withAuth, homeController.renderPostView);

module.exports = router;