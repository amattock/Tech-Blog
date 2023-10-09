const comment = require('./comment');
const post = require('./post');
const user = require('./user');
const sequelize = require('sequelize');

user.hasMany(post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

post.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

comment.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

comment.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

sequelize.sync().then(() => {
    console.log('Tables have been synced')
})
    .catch((err) => {
        console.log('error syncing database', err)
    });

module.exports = { comment, post, user };