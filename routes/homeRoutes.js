const router = require('express').Router();

// Route for rendering the home page
router.get('/', (req, res) => {
  res.render('home'); // Render the home view
});

// Route for rendering the signUpIn page
router.get('/signUpIn', (req, res) => {
  res.render('signUpIn'); // Render the signUpIn view
});

// Route for rendering the signIn page
router.get('/signIn', (req, res) => {
  res.render('signIn'); // Render the signIn view
});

// Route for rendering the signIn page
router.get('/signIn', (req, res) => {
    res.render('signIn'); // Render the signIn view
  });

module.exports = router;