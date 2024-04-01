const router = require('express').Router();
const withAuth = require('../../utils/auth');

const CommentController = require('../../controllers/commentController');

// Define routes for comment-related requests

router.post('/newComment', withAuth, CommentController.createComment);
router.get('/comments/:postId', withAuth, CommentController.getCommentsByPostId);
router.get('/comment/:id', withAuth, CommentController.getCommentById);
router.put('/comment/:id', withAuth, CommentController.updateCommentById);
router.delete('/comment/:id', withAuth, CommentController.deleteCommentById);

module.exports = router;