// Routes for rendering views

// Initialize express router
const express = require('express');
const router = express.Router();

// Route for rendering the home page
router.get('/', (req, res) => {
  res.render('home', { logged_in: req.session.logged_in }); // Render the home view
});

// Route for rendering the signUpIn view page
router.get('/signUpIn', (req, res) => {
  res.render('signUpIn'); // Render the signUpIn view
});

/* // Route for redirecting to dashboard view page after successful sign in
router.get('/signin', (req, res) => {
  res.render('dashboard'); // Render the signIn view
});

// Route for redirecting to dashboard view page after successful sign up
router.get('/signup', (req, res) => {
  res.render('dashboard'); // Render the signIn view
}); */


// Route for rendering the dashboard view page
router.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render the dashboard view
  });

  // Route for rendering the post view page
router.get('/post', (req, res) => {
    res.render('post'); // Render the post view
  });

module.exports = router;