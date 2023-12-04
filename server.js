const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// These are our routes, which connect to other files (local imports): Make sure these files exist
const helpers = require('./utils/helpers');
const routes = require('./controllers');

const app = express();
// allows us to run server more cleanly (cors: Cross-Origin Resource Sharing)
// http vs https; makes sure you are on the same server to share resources, as server might be on http, but client might be on https
app.use(cors());
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/config');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
  sequelize.sync({ force: false });
});