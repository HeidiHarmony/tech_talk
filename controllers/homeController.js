const router = require('express').Router();
// const { render } = require('node-sass');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

let logged_in = false;

module.exports = {

// Handler to render the home page ----------------------------

renderHome: async function(req, res, _next) {
    // Check if a user is logged in
 if (req.session && req.session.user) {
      logged_in = true;
    }
    try {
    // Get all posts and JOIN with user data
    const posts = await Post.findAll({
      include: User,
      where: { status: 'published' },
      attributes: ['title', 'date_created'],
    });

    // Serialize data so the template can read it
    const serializedPosts = posts.map((post) => post.get({ plain: true }));

    // Render the home view, passing in the necessary data
    res.render('home', {
      logged_in,
      posts: serializedPosts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
},

// Handler to render the sign-up/sign-in page ----------------------------
// Three ways to reach signUpIn from home page: navigation link for sign-up/sign-in, navigation for dashboard if NOT signed in, and post list if NOT signed in

renderSignUpIn: async function(req, res, _next) {
      res.redirect('/signUpIn');
    },
   
// Handler for rendering the dashboard ----------------------------

renderDashboard: async function(req, res, _next) {

  // Check if the user is logged in
  if (req.session && req.session.user) {
    logged_in = true;
    // Fetch the posts for the logged in user
    const posts = await posts.findAll({
      where: {
        user_id: req.session.user.id // Only fetch posts where the user_id matches the logged in user's id
      }
    });
    res.redirect('dashboard', withAuth, posts);
  } else {
    res.redirect('signUpIn');
  }
},

// Handler for rendering the post view ----------------------------

renderPostView: async function(req, res, _next) {
  // Check if the user is logged in
  if (req.session && req.session.user) {
    logged_in = true;
    const post = await Post.findByPk(req.params.id, {
      include: {
        model: User,
        attributes: ['username']
    }
      }
    );
    res.redirect('postView', post);
  } else {
    alert('You must be logged in to read posts.');
    res.redirect('signUpIn');
  }
}
};