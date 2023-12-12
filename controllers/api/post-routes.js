const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');
// The Post Route
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Setup Put Route

// Setup delete Route

module.exports = router;