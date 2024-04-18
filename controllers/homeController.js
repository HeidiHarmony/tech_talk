// controllers/homeController.js
const { User, Post } = require('../models');

module.exports = {

  renderHome: async function(req, res, next) {
    try {
      const posts = await Post.findAll(); // Fetch all posts from the database
      res.render('home', { posts, logged_in: req.session.logged_in }); // Pass the posts to the view
    } catch (err) {
      next(err); // Pass any errors to the error handling middleware
    }
  },

  renderDashboard: async function(req, res, _next) {
    console.log("let's try to render the dashboard, shall we?");
    //const user = req.session.user;
      try {
        const posts = await Post.findAll({
          include: User,
          where: {
            user_id: req.session.user_id,
            status: 'published'
          },
          attributes: ['title', 'date_created'],
        });

console.log("Found your posts!")
        const serializedPosts = posts.map((post) => post.get({ plain: true }));
      
        console.log(serializedPosts);
        res.render('dashboard', { userposts: serializedPosts, logged_in: req.session.logged_in, user: req.session.username });
      } catch (err) {
        console.log("this is the error    " + err)
        res.status(500).json(err);
      }
 },

  renderSignUpIn: async function(_req, res, _next) {
    res.render('signUpIn');
  },
  renderPostView: async function(req, res, _next) {
    if (req.session && req.session.user) {
      const post = await Post.findByPk(req.params.id, {
        include: {
          model: User,
          attributes: ['username']
        }
      });

      if (post) {
        res.render('postView', { post: post.get({ plain: true }) });
      } else {
        res.status(404).json({ message: 'No post found with this id' });
      }
    } else {
      console.log("posts? we don't need no stinkin' posts!");
      // res.redirect('/signUpIn');
    }
  }
};