const router = require('express').Router();
require('../../models');
const withAuth = require('../../utils/auth');
const UserController = require('../../controllers/api/userController');

// Define routes for user-related requests

router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/getAllUsers', UserController.getAllUsers);
router.get('/getUser/:id', UserController.getUserById);
router.put('/updateUser/:id', UserController.updateUserById);
router.post('/logout', UserController.logout);

module.exports = router;
