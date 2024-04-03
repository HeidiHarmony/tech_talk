const Post = require('../../models/Post');
const User = require('../../models/User');
const { all } = require('../../routes/api/postRoutes');
//const withAuth = require('../../utils/auth');
// const errorHandler = require('../../utils/error');

module.exports = {
// Create a new post and save as draft route

newPostDraft: async function(req, res, next) {
  try {
    console.log(req.session.user_id);
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      status: 'draft',
    });
    res.status(200).json(newPost);
  } catch (err) {
    next(err);
}
},

// Create a new post and publish route

newPostPublished: async function(req, res, next) {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      status: 'published',
    });
    res.status(200).json(newPost);
  } catch (err) {
    next(err);
  }
},

// Get all posts route

getAllPosts: async function(req, res, next) {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
},

// Get a post by id route

getPostById: async function(req, res, next) {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
},

// Update a post by id route

updatePostById: async function(req, res, next) {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
},

// Delete a post by id route

deletePostById: async function(req, res, next) {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
},

// Publish a draft route

publishDraft: async function(req, res, next) {
  try {
    const postData = await Post.update(
      { status: 'published' },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
},

// Unpublish a post route
unpublish: async function(req, res, next) {
  try {
    const postData = await Post.update(
      { status: 'draft' },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
},
};