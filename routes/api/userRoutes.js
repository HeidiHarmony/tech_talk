const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');
const UserController = require('../../controllers/api/userController');

// test route
router.get('/test', UserController.test);

// Define routes for user-related requests

router.post('/signup', UserController.signup); // Sign up a new user

router.post('/signin', UserController.signin); // Sign in a registered user

router.get('/getAllUsers', UserController.getAllUsers); // Get all users
router.get('/getUser/:id', withAuth, UserController.getUser); // Get a user by id
router.put('/updateUser/:id', withAuth, UserController.updateUser); // Update a user by id
router.post('/logout', withAuth, UserController.logout); // Log out a user

module.exports = router;
