// const express = require('express'); // Import express
// const router = express.Router(); // Create a router instance

const Comment = require('../../models/Comment');

module.exports = {
// Create a new comment route -----------------------------------------
newComment: async function(req, res, next) {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    next(err);
  }
},

// Get all comments by post id route ------------------------------------

getCommentsByPostId: async function(req, res, next) {
    try {
        const commentData = await Comment.findAll({
        where: { post_id: req.params.postId },
        });
        res.status(200).json(commentData);
    } catch (err) {
        next(err);
    }
    },

// Get a comment by id route ---------------------------------------

getCommentById: async function(req, res, next) {
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
  },

// Update a comment by id route ------------------------------

updateCommentById: async function(req, res, next) {
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
    },

    // Delete a comment by id route --------------------------------

deleteCommentById: async function(req, res, next) {
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
},
};

   


