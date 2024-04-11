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
    res.render('home', {
      posts: serializedPosts,
      logged_in: req.session.logged_in,
      user: req.session.user,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for rendering the dashboard

router.get ('/dashboard', withAuth, async (req, res, _next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    res.redirect('/signUpIn');
    return;
  }
  // Fetch the posts for the logged in user
  const posts = await posts.findAll({
    where: {
      user_id: req.session.user_id // Only fetch posts where the user_id matches the logged in user's id
    }
  });
  // Render the dashboard with the user's posts
  res.render('dashboard', { posts });
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




router.get('/signUpIn', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
}); 

module.exports = router;
