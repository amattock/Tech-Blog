const router = require('express').Router();
const { comment } = require('../../models');
const authenticated = require('../../utils/auth');

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
        const commentData = await comment.update({
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