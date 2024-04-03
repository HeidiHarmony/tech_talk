const router = require('express').Router();
const withAuth = require('../../utils/auth');
const CommentController = require('../../controllers/commentController');

// Define routes for comment-related requests

router.post('/newComment', withAuth, CommentController.createComment);

router.get('/getCommentsByPostId/:postId', withAuth, CommentController.getCommentsByPostId);

router.get('/getCommentById/:id', withAuth, CommentController.getCommentById);

router.put('/updateCommentById/:id', withAuth, CommentController.updateCommentById);

router.delete('/deleteCommentById/:id', withAuth, CommentController.deleteCommentById);

module.exports = router;