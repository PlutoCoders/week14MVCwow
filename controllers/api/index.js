const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./post-routes.js');
// adding comment routes
const commentRoutes = require('./comment-routes.js');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;