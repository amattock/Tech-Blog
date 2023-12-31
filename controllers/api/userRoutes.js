
const express = require("express");
const router = express.Router();
const { user } = require('../../models');

// router.post('/', async (req, res) => {
//     try {
//         const newUser = await user.create({
//             username: req.body.username,
//             email: req.body.email,
//             password: req.body.password,
//         });
//         res.status(200).json(newUser);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

router.post('/login', async (req, res) => {
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


router.post("/signup", async (req, res) => {
    try {
        const userData = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });

        // Remove the following line:
        // res.redirect('/');

    } catch (err) {
        res.status(400).json(err);
    }
});


router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;
