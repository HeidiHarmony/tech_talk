const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'userData.json')));
const postData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'postData.json')));
const commentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'commentData.json')));

console.log("beginning to seed...");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Sync models with database

    console.log("synced");

    await User.bulkCreate(userData); // Seed User data
    console.log("users seeded");
    await Post.bulkCreate(postData); // Seed Post data
    console.log("posts seeded");
    await Comment.bulkCreate(commentData); // Seed Comment data
    console.log("comments seeded");
  
    console.log('Seeds have been planted!');
  } catch (err) {
    console.error('Error seeding database', err);
   } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
};

seedDatabase();
// module.exports = seedDatabase;
