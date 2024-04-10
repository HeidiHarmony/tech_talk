const { User } = require('../../models');
const bcrypt = require('bcrypt');
const withAuth = require('../../utils/auth');

module.exports = {

// Test route -----------------------------------------

test: async function(req, res) {
  res.send('Backend is up and running!');
},

// Sign up a new user route ----------------------------

    signup: async function(req, res, next) {

      try {
        const { name, email, username, password } = req.body;

        // Log the received request body
    console.log('Received sign-up request:', req.body);
  
        // Validate input
        if (!name || !email || !username || !password) {
          console.error('Validation failed: Required fields are missing');
          return res.status(400).json({ error: 'All fields are required' });
        }

     // Create a new user
        const userData = await User.create({ name, email, username, password });

        // Log successful sign-up
    console.log('User signed up successfully:', userData);
  
    // Set session data
        req.session.user_id = userData.id;
         console.log('User ID:', req.session.user_id);
        req.session.logged_in = true;
         console.log('User logged in:', req.session.logged_in);
        req.session.username = userData.username;
         console.log('Username:', req.session.username);
        req.session.email = userData.email;
         console.log('Email:', req.session.email);
        req.session.name = userData.name;
         console.log('Name:', req.session.name);
  
          console.log("You are now logged in!");

          res.redirect('/dashboard');

      } catch (err) {
        console.error('Error occurred during sign-up:', err);
        if (err.name === 'ValidationError') {
          res.status(400).json({ error: err.message });

        } else {
          next(err);
        }
      }
    },

// Sign in route for registered users ----------------------------------------


signin: async function(req, res, _next) {
  console.log('Welcome to sign-in. Good luck!');
  try {
    // Find the user in the database based on the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log('userData:', userData);

    // Check if a user with the provided email exists
    if (!userData) {
      return res.status(400).json({ message: 'Email not found. Boo.' });
    }

    // Compare the submitted password with the hashed password stored in the database
    const isPasswordCorrect = await bcrypt.compare(req.body.password, userData.password);

    if (isPasswordCorrect) {
      console.log('It\'s a match!');
      // Passwords match, proceed with authentication
      req.session.user_id = userData.id;
      console.log('User ID:', req.session.user_id);
      req.session.logged_in = true;
      console.log("User " + userData.username + " is now logged in!");

      await req.session.save(); // Save the session before sending the response

      return res.json({ user: userData, message: 'You are now logged in!' });
    } else {
      // Passwords don't match, reject the sign-in attempt
      return res.status(400).json({ message: 'Your password is incorrect. Please try again.' });
    }
  } catch (err) {
    // Handle any other errors
    console.error('Error occurred during sign-in:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
},


// Get all users route -----------------------------------------

getAllUsers: async function(req, res, next) {
  try {
    const userData = await User.findAll();

    if (!userData) {
      res.status(404).json({ message: 'No users found!' });
      return;
    }

    // Only includes the needed properties
    const users = userData.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
    }));

    res.status(200).json(users);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
},

// Get user by id route -----------------------------------------
getUser: async function(req, res, next) {
  try {
    const id = req.session.user_id;
    const userData = await User.findByPk(id);

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    // Only includes the needed properties
    const user = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
    };

    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
},

// Update user by id route -----------------------------------------
updateUser: async function(req, res, next) {
  try {
    const { username, email } = req.body;

    // Validate input
    if (!username || !email) {
      return res.status(400).json({ message: 'Username and email are required' });
    }

    const userData = await User.update({ username, email }, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    // Get the updated user data
    const updatedUser = await User.findByPk(req.params.id);

    // Pick only the properties you need
    const user = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      // Add any other properties you need
    };

    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
  }
},

// Log out route for users -----------------------------------------
logout: async function(req, res, _next) {
  if (req.session.logged_in) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Failed to logout.' });
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(401).end();
  }
},
};