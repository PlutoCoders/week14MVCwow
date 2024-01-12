const router = require('express').Router();
const { User } = require('../../models');

// Post request for adding a new user
router.post('/', async (req, res) => {
  try {
    // Creating the new user in the database base on what was provided as input
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
  // Saves the user data in our db
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

// Handle login attempts
router.post('/login', async (req, res) => {
  try {
    console.log(req.body.username);
    // Looking for the username in the database based on what was provided in the body input
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // If we can't find a match
    if (!user) {
      res.status(400).json({ message: 'Cant find user account' });
      return;
    }
    // Creating the variable that contains the correct password that is stored in the db. This is what we will compare the input password to
    const validPassword = user.checkPassword(req.body.password);

      // This is what happens when the password in invalid (throw error)
    if (!validPassword) {
      res.status(400).json({ message: 'Cant find user account' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'Logged In!' });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: 'Cant find user account' });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
