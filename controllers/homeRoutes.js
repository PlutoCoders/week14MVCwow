const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Is there a way to make this code more dry, since this same data to render is called multiple times throughout the code?
    // This is an object, and it contains properties that are essential for providing info to render info/make a request/passing data
    let dataToRender = {
      year: new Date().getFullYear(),
      userId: req.session.userId,
      path: req.route.path,
      title: `Blog of Tech`,
    }

    res.render('all-posts', { 
      posts,
      ...dataToRender
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    // Here we are searching for a post by the primary key
    const postData = await Post.findByPk(req.params.id, {
      // Along with the post data, we also want to retrieve information about the user who posted said coment
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      const post = postData.get({ plain: true });

      let dataToRender = {
        year: new Date().getFullYear(),
        userId: req.session.userId,
        path: req.route.path,
        title: `Blog of Tech`,
      }

      res.render('single-post', { post, ...dataToRender });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    // Blog of Tech is the title of our blog website
  let dataToRender = {
    year: new Date().getFullYear(),
    userId: req.session.userId,
    path: req.route.path,
    title: `Blog of Tech`,
  }

  res.render('login', dataToRender);
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  let dataToRender = {
    year: new Date().getFullYear(),
    userId: req.session.userId,
    path: req.route.path,
    title: `Blog of Tech`,
  }

  res.render('signup', dataToRender);
});

module.exports = router;
