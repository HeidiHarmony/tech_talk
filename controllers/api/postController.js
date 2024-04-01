const express = require('express'); // Import express
const router = express.Router(); // Create a router instance
const Post = require('../../models/Post');
const User = require('../../models/User');
const withAuth = require('../../utils/auth');
const errorHandler = require('../../utils/error');

// Create a new post and save as draft route

router.post('/newPostDraft', withAuth, async (req, res, next) => {
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
}});

// Create a new post and publish route

router.post('/newPostPublished', withAuth, async (req, res, next) => {
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
});

// Get all posts route

router.get('/allPosts', async (req, res, next) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });
    res.status(200).json(postData);
  } catch (err) {
    next(err);
  }
});

// Get a post by id route

router.get('/getPost/:id', async (req, res, next) => {
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
});

// Update a post by id route

router.put('/updatePost/:id', withAuth, async (req, res, next) => {
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
});

// Delete a post by id route

router.delete('/deletePost:/id', withAuth, async (req, res, next) => {
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
});

// Publish a draft route

router.put('/publishPost/:id', withAuth,async (req, res, next) => {
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
});

// Unpublish a post route

router.put('/unpublishPost/:id', withAuth, async (req, res, next) => {
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
});

module.exports = router;