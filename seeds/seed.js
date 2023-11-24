const sequelize = require('../config/connection');
const { user, comment, post } = require('../models'); // Import your models
const userData = require('./userSeeds.json');
const commentData = require('./commentSeeds.json');
const postData = require('./postSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- synced DB-----\n');

  for (const userDataItem of userData) {
    await user.create({
      ...userDataItem,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    console.log('\n----- seeded userData-----\n');
  }

  for (const commentItem of commentData) {
    await comment.create({
      ...commentItem,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    console.log('\n----- seeded commentData-----\n');
  }

  for (const postItem of postData) {
    await post.create({
      ...postItem,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    console.log('\n----- seeded postData-----\n');
  }

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });
//   console.log('\n----- DATABASE SYNCED -----\n');

//   await userData();
//   console.log('\n----- USERS SEEDED -----\n');

//   await postData();
//   console.log('\n----- post POSTS SEEDED -----\n');

//   await commentData();
//   console.log('\n----- COMMENTS SEEDED -----\n');

  console.log('\n----- seeded DB-----\n');
  process.exit(0);
};

seedDatabase();




