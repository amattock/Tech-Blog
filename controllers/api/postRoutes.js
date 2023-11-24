const express = require('express');
const router = express.Router();
const { post, user, comment } = require('../../models');
const authenticated = require('../../utils/auth');

router.post('/post',authenticated, async (req, res) => {
    try {
        const newPost = await post.create({
            ...req.body,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', authenticated, async (req, res) => {
    try {
        const postData = await post.update(
            // Provide the data to be updated
            { ...req.body },
            // Provide the condition
            { where: { id: req.params.id } }
        );

        if (!postData) {
            res.status(404).json({ message: "No post information found with this id" });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id',authenticated, async (req, res) => {
    try {
        const postData = await post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: "No post information found with this id" });
            return;
        }

        res.status(200).json(postData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
