const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');
const CommentController = require('../../controllers/api/commentController');

// Define routes for comment-related requests

router.post('/createComment', withAuth, CommentController.createComment);

router.post('/saveComment', withAuth, CommentController.saveComment);

router.get('/getCommentsByPostId/:postId', withAuth, CommentController.getCommentsByPostId);

router.get('/getCommentById/:id', withAuth, CommentController.getCommentById);

router.delete('/deleteCommentById/:id', withAuth, CommentController.deleteCommentById);

module.exports = router;