const express = require('express');
const router = express.Router();
const { post, user, comment } = require('../models');
const authenticated = require('../utils/auth');
const sequelize = require('../config/connection');

// GET request for finding all
// router.get('/',  async (req, res) => {

//     post.findAll({
//         where: { user_id: req.session.user_id },
//         attributes: ['id', 'commentBody', 'date_created', 'post_id', 'user_id'],
//         include: [
//             {
//                 model: comment,
//                 attributes: ['id', 'commentBody', 'date_created', 'post_id', 'user_id'],
//                 include: {
//                     model: user,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: user,
//                 attributes: ['username']
//             }
//         ]
//     }).then(postData => {
//         const posts = postData.map(post => post.get({ plain: true }));
//         res.render('dashboard', { posts, loggedIn: true });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// }
// );
// router.get('/edit/:id', authenticated, (req, res) => {
//     post.findOne({
//         where: {
//             id: req.params.id
//         },
//         attributes: ['id', 'commentBody', 'date_created', 'post_id', 'user_id'],
//         include: [
//             {
//                 model: comment,
//                 attributes: ['id', 'commentBody', 'date_created', 'post_id', 'user_id'],
//                 include: {
//                     model: user,
//                     attributes: ['username']
//                 }
//             },
//             {
//                 model: user,
//                 attributes: ['username']
//             }
//         ]
//     }).then(postData => {
//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         const post = postData.get({ plain: true });
//         res.render('edit-post', { post, loggedIn: true });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// module.exports = router;


router.get('/', (req, res) => {
    post.findAll({include: [user]}).then(post => {
        const hbspost = post.map(post=>post.get({plain:true}))
        const loggedIn = req.session.user?true:false;
        res.render('home', {post:hbspost, loggedIn, username:req.session.user?.username})
    })
})

router.get("/login",(req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render("login")
})

router.get("/signup",(req,res)=>{
    res.render("signup")
})

router.get("/dashboard",(req,res)=>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    User.findByPk(req.session.user.id, {
        include: [post, Comment]
    }).then(userData => {
        const hbsData = userData.get({plain:true})
        hbsData.loggedIn = req.session.user?true:false
        res.render("dashboard", hbsData)
    })
})

// SINGLE POST PAGE FUNCTION
router.get("/post/:id", (req, res) =>{
    if(!req.session.user) {
        return res.redirect('/login')
    }
    post.findByPk(req.params.id,{include:[User, {model: Comment, include: [User]}]})
    .then(dbpost => {
        const hbspost = dbpost.get({plain:true})
        const loggedIn = req.session.user?true:false;
        console.log('==============')
        console.log(hbspost)
        if (dbpost.userId != req.session.user.id) {
// If not your post -> render comment page over homepage
            return res.render('comment', {hbspost, loggedIn, username:req.session.user?.username})
        }
        // If your post -> render update/delete page over your dashboard
        res.render("updateDelete", {hbspost, loggedIn, username:req.session.user?.username})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "an error occured", err });
      });
})

router.get("*",(req,res)=>{
    res.redirect("/")
})

module.exports = router;