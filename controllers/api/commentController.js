const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');
const errorHandler = require('../../utils/error');

// Create a new comment route -----------------------------------------

router.post('/newComment', withAuth, async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
});

// Get all comments by post id route ------------------------------------

router.get('/comments/:postId', withAuth, async (req, res, next) => {
    try {
        const commentData = await Comment.findAll({
        where: { post_id: req.params.postId },
        });
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    });

// Get a comment by id route ---------------------------------------

router.get('/comment/:id', withAuth, async (req, res, next) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    });

// Get comments by post id route --------------------------------------

router.get('/comments/:postId', withAuth, async (req, res, next) => {
    try {
        const commentData = await Comment.findAll({
        where: { post_id: req.params.postId },
        });
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    });

    // Get a comment by id route ----------------------------------

router.get('/comment/:id', withAuth, async (req, res, next) => {
    try {
        const commentData = await Comment.findByPk(req.params.id);
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    });

// Update a comment by id route ------------------------------

router.put('/comment/:id', withAuth, async (req, res, next) => {
    try {
        const commentData = await Comment.update(req.body, {
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
        if (!commentData[0]) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    });

    // Delete a comment by id route --------------------------------

router.delete('/comment/:id', withAuth, async (req, res, next) => {
    try {
        const commentData = await Comment.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    });

    module.exports = router;


