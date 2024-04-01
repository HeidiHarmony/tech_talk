const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const UserController = require('../../controllers/userController');

// Define routes for user-related requests

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUserById);
router.post('/logout', UserController.logout);

module.exports = router;
