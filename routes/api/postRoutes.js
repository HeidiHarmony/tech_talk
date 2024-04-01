const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const PostController = require('../../controllers/postController');

// Define routes for post-related requests

router.post('/newPostDraft', withAuth, PostController.createPost);
router.post('/newPostPublished', withAuth, PostController.createPost);
router.get('/allPosts', PostController.getAllPosts);
router.get('/post/:id', PostController.getPostById);
router.put('/post/:id', withAuth, PostController.updatePostById);
router.delete('/post/:id', withAuth, PostController.deletePostById);
router.put('/post/:id/publishDraft', withAuth, PostController.updatePostById);
router.put('/post/:id/unpublish', withAuth, PostController.updatePostById);

module.exports = router;
