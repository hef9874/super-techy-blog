const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const session = require('express-session');
const Handlebars = require('handlebars');

Handlebars.registerHelper('format_plural', (number, singular, plural) => {
  if (number === 1) {
    return `${number} ${singular}`;
  }
  return `${number} ${plural}`;
});


const SequelizeStore = require("connect-session-sequelize")(session.Store);

const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001; 

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


const sess = {
    secret: 'shh secret',
    cookie: {
      maxAge: 60 * 60 * 1000,
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(require('./controllers/'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
    sequelize.sync({ force: false });
  });