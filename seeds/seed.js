const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const { clear } = require('console');

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'userData.json')));
const postData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'postData.json')));
const commentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'commentData.json')));

console.log("beginning to seed...");

const seedDatabase = async () => {
  try {
    await sequelize.sync({force: true}); // Sync models with database

    console.log("synced");

// Seed User
for (const user of userData) {
  await User.create(user, {individualHooks: true});
}
console.log("users seeded");

// Retrieve the users from the database
//const users = await User.findAll();

// Map the users to their ids
//const userIds = users.map(user => user.id);
 //console.log("This is users id",userIds)
// {

//  user_id: 1,
//  title: "title",
//  content: "content"



// }
////let listofPost = postData.map((post, index) => ({ ...post }))


//console.log(listofPost)
// Use the userIds array when seeding the Post and Comment data
let listPost = await Post.bulkCreate(postData);
 console.log("posts seeded");
 console.log(listPost)

 await Comment.bulkCreate(commentData);
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
