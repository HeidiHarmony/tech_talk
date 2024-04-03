// Routes for rendering views

// Initialize express router
const express = require('express');
const router = express.Router();

// Route for rendering the home page
router.get('/', (req, res) => {
  res.render('home'); // Render the home view
});

// Route for rendering the signUpIn view page
router.get('/signUpIn', (req, res) => {
  res.render('signUpIn'); // Render the signUpIn view
});

// Route for rendering the signIn view page
router.get('/signIn', (req, res) => {
  res.render('signIn'); // Render the signIn view
});

// Route for rendering the dashboard view page
router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render the dashboard view
  });

  // Route for rendering the post view page
router.get('/post', (req, res) => {
    res.render('post'); // Render the post view
  });

module.exports = router;