// const router = require('express').Router();
// const apiRoutes = require('./api');
// const homeRoutes = require('./home-routes');

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

// module.exports = router;

// attempt 1 ----------------------------------------------------------------------------------------------------------------------------

// const express = require('express');
// const router = express.Router();

// const apiRoutes = require('./api/index');  // Make sure the path is correct
// const homeRoutes = require('./homeRoutes'); // Make sure the path is correct

// router.use('/api', apiRoutes);
// router.use('/', homeRoutes);

// module.exports = router;

// attempt 2 ----------------------------------------------------------------------------------------------------------------------------

const express = require('express');
const router = express.Router();

const commentRoutes = require('./api/commentRoutes');
router.use('/comment', commentRoutes);

const postRoutes = require('./api/postRoutes');
router.use('/post', postRoutes);

const userRoutes = require('./api/userRoutes');
router.use('/user', userRoutes);

const homeRoutes = require('./homeRoutes');
router.use('/', homeRoutes);

module.exports = router;
