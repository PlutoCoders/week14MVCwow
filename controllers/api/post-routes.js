const router = require('express').Router();
const { Post } = require('../../models/');

// The Post Route
router.post('/', async (req, res) => {
  const body = req.body;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Setup Put Route
router.put('/:id', async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      // Puts and deletes can use 204
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Setup delete Route
router.delete('/:id', async (req, res) => {
  try {
   await Post.destroy({where:{id:req.params.id}});
  //  We want to keep our network traffic down as low as we can
  // graphQL is for keeping network traffic down
  // For posts and puts, you don't have to send anything
    res.status(204).end()
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;