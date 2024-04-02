const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'userData.json')));
const postData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'postData.json')));
const commentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'commentData.json')));

const seedDatabase = async () => {
  try {
    await User.bulkCreate(userData); // Seed User data
    await Post.bulkCreate(postData); // Seed Post data
    await Comment.bulkCreate(commentData); // Seed Comment data
    console.log('Seeds have been planted!');
  } catch (err) {
    console.error('Error seeding database', err);
  }
};

module.exports = seedDatabase;
