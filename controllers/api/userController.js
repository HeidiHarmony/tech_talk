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
  
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Log hashed password
    console.log('Hashed password:', hashedPassword);

     // Create a new user
        const userData = await User.create({ name, email, username, password: hashedPassword });

        // Log successful sign-up
    console.log('User signed up successfully:', userData);
  
    // Set session data
          req.session.user_id = userData.id;
          req.session.logged_in = true;
  
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

signin: async function(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
    } else {
      next(err);
    }
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
logout: async function(req, res, next) {
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