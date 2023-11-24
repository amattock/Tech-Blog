const express = require("express");
const router = express.Router();
const { post, user, comment } = require('../../models');

router.post('/user', async (req, res) => {
    try {
        const userData = await user.create(req.body);
        console.log(userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/user/login', async (req, res) => {
    try {
        const userData = await user.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password." });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password." });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Login successful." });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/user/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
