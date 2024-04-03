const router = require('express').Router();
const withAuth = require('../../utils/auth');
const PostController = require('../../controllers/api/postController');

// Define routes for post-related requests

router.post('/newPostDraft', withAuth, PostController.newPostDraft);

router.post('/newPostPublished', withAuth, PostController.newPostPublished);

router.get('/getAllPosts', PostController.getAllPosts);

router.get('/getPostById/:id', PostController.getPostById);

router.put('/updatePostById/:id', withAuth, PostController.updatePostById);

router.delete('/deletePostById/:id', withAuth, PostController.deletePostById);

router.put('/publishDraft/:id', withAuth, PostController.publishDraft);

router.put('/unpublish/:id', withAuth, PostController.unpublish);

module.exports = router;