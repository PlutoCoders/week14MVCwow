// Requiring dependencies
const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// Setup post route here

router.post('/', withAuth, async (req, res) => {
    try {
        // Creates a new comment
      const newComment = await Comment.create({
        // its using the data received in the request body
        ...req.body,
        userId: req.session.userId,
      });
      res.json(newComment);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;
