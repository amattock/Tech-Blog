const sequelize = require('../config/connection');
const {comment, post, user } = require('../models'); 

const userData =require('./userSeeds.json');
const commentData = require('./commentSeeds.json');
const postData = require('./postSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

const user = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

    for (const comment of commentData) {
    await comment.create({
      ...comment,
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    }

    for (const post of postData) {
    await post.create({
      ...post,
    //   user_id: users[Math.floor(Math.random() * users.length)].id,
    });
    }

    process.exit(0);
}

seedDatabase();

