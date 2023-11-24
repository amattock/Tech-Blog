// const require = ('dotenv').config();
// const Sequelize = require('sequelize');
// const express = require('express');
const express = require('express');
const router = express.Router();
const { post, user, comment } = require('../../models');
const authenticated = require('../../utils/auth');


router.get('/comment', authenticated, async (req, res) => {
    try {
        const commentData = await comment.findAll({
            where: { user_id: 2 },
        });
        const userData = await user.findAll({
            where: { id: 2 },
        });
        const postData = await post.findAll({
            where: { user_id: 2 },
        });

        const user = userData.get({ plain: true });
        const comment = commentData.get({ plain: true });
        const post = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {

            ...comment,
            ...post,
            ...user,
            // logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', authenticated, async (req, res) => {
    try {
        const newComment = await comment.create({
            ...req.body,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', authenticated, async (req, res) => {
    try {
        const commentData = await comment.update(
            // Provide the data to be updated
            { ...req.body },
            // Provide the condition
            { where: { id: req.params.id } }
        );

        if (!commentData) {
            res.status(404).json({ message: "No comment information found with this id" });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', authenticated, async (req, res) => {
    try {
        const commentData = await comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment information found with this id" });
            return;
        }

        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
