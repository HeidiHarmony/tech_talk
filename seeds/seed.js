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

    // Seed User data
await User.bulkCreate(userData, {individualHooks: true});
console.log("users seeded");

// Retrieve the users from the database
const users = await User.findAll();

// Map the users to their ids
const userIds = users.map(user => user.id);

// Use the userIds array when seeding the Post and Comment data
await Post.bulkCreate(postData.map((post, index) => ({ ...post, user_id: userIds[index] })));
console.log("posts seeded");

await Comment.bulkCreate(commentData.map((comment, index) => ({ ...comment, user_id: userIds[index] })));
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
