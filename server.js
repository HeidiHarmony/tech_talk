require('dotenv').config(); // Import and configure dotenv package

const path = require('path'); 
const fs = require('fs'); 
const express = require('express'); 
const session = require('express-session'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); // Add body-parser middleware
// const setLocals = require('./utils/setLocals');
const routes = require('./routes');
const errorHandler = require('./utils/error'); // Import errorHandler middleware
const helpers = require('./utils/helpers');

const app = express();

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, // 2 hours
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(bodyParser.json()); // Use body-parser middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.static(path.join(__dirname, 'public')));

// app.use(setLocals); // Add setLocals middleware to all routes

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);

// Register the partials
hbs.handlebars.registerPartial(
  'postList-p',
  fs.readFileSync(path.join(__dirname, '/views/partials/postList-p.handlebars'), 'utf8')
);

hbs.handlebars.registerPartial(
  'footerScroll-p',
  fs.readFileSync(path.join(__dirname, '/views/partials/footerScroll-p.handlebars'), 'utf8')
);

hbs.handlebars.registerPartial(
  'footerStatic-p',
  fs.readFileSync(path.join(__dirname, '/views/partials/footerStatic-p.handlebars'), 'utf8')
);

hbs.handlebars.registerPartial(
  'newPost-p',
  fs.readFileSync(path.join(__dirname, '/views/partials/newPost-p.handlebars'), 'utf8')
);

hbs.handlebars.registerPartial(
  'showPost-p',
  fs.readFileSync(path.join(__dirname, '/views/partials/showPost-p.handlebars'), 'utf8')
);

app.set('view engine', 'handlebars');

app.use(routes);

app.use(errorHandler); // Add errorHandler middleware to all routes

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});
