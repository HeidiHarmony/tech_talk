const User = require('../../models/User');
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const errorHandler = require('../../utils/error');

// Signup a new user route

router.post('/signup', async (req, res, next) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    next(err);
  }
});

// Sign in route for registered users ----------------------------------------

router.post('/signin', async (req, res, next) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

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
    next(err);
  }
});

// Get all users route -----------------------------------------

router.get('/getAllUsers', async (req, res, next) => {
  try {
    const userData = await User.findAll();

    res.status(200).json(userData);
  } catch (err) {
   next(err);
  }
});

// Get user by id route -----------------------------------------

router.get('/getUser/:id', async (req, res, next) => {
  try {
    const userData = await User.findByPk(req.params.id);

    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
});

// Update user by id route -----------------------------------------

router.put('/updateUser/:id', withAuth, async (req, res, next) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
   next(err);
  }
});

// Log out route for users -----------------------------------------

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;