const  Post = require('../../models/Post');
const withAuth = require('../../utils/auth');

// Create a new post and save as draft route

router.post('/newPostDraft', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      status: 'draft',
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new post and publish route

router.post('/newPostPublished', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      status: 'published',
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all posts route

router.get('/allPosts', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a post by id route

router.get('/post/:id', async (req, res) => {
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
    res.status(500).json(err);
  }
});

// Update a post by id route

router.put('/post/:id', withAuth, async (req, res) => {
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
    res.status(500).json(err);
  }
});

// Delete a post by id route

router.delete('/:id', withAuth, async (req, res) => {
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
    res.status(500).json(err);
  }
});

// Publish a draft route

router.put('/post/:id/publishDraft', withAuth, async (req, res) => {
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
    res.status(500).json(err);
  }
});

// Unpublish a post route

router.put('/post/:id/unpublish', withAuth, async (req, res) => {
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
    res.status(500).json(err);
  }
});


module.exports = router;
