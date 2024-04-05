const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
     // Check if a user is logged in
     let user;
     if (req.session && req.session.user) {
       user = req.session.user;
     }

    // Get all posts and JOIN with user data
    const posts = await Post.findAll({
      include: User,
      where: { status: 'published' },
      attributes: ['title', 'date_created'],
    });

    // Log post details
    posts.forEach((post) => {
      console.log(`Title: ${post.title} - Author: ${post.User.username} - Date: ${post.date_created}`);
    });

    // Serialize data so the template can read it
    const serializedPosts = posts.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { posts }, {
      posts: serializedPosts,
      logged_in: req.session.logged_in,
      user: req.session.user,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
}); 

module.exports = router;
