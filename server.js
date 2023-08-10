const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");
const routes = require("./controllers");

const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT | 3001;
const app = express();

// Set up cookie session
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// Use session
app.use(session(sess));

// Initiate handlebars
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Wait until db is setup before running server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server now listening on ${PORT}...`));
});
