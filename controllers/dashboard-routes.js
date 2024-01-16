const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// withAuth allows us to make sure the user as authorization in order to access a route
router.get('/', withAuth, async (req, res) => {
  try {
    // allows us to grab all posts belonging to the user ID  which matches session userId
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Setting up the object containing data which we will then use in res.render (to render)
    // let dataToRender = {
    //   title: `Dashboard`,
    //   year: new Date().getFullYear(), 
    //   userId: req.session.userId, 
    //   path: req.route.path,
    // }
    
    // rendering here using the layout: dashboard
    res.render('dashboard', {
      // layout: 'dashboard',
      posts,
      // This has to go o nall the rotues so the nav knows whether to render the logged in navigation or the logged in button based on if the user is logged in or not
      logged_in: req.session.loggedIn
      // ...dataToRender
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    // Strips all the seq off everything
    const post = postData.get({plain:true})
    res.render('edit', {
      ...post,
      // These pages all go through main, and it makes sure that the user is logged in
      logged_in: req.session.loggedIn
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});


module.exports = router;
