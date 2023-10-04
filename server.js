// Import required modules and set up Express.js
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure session settings
const sess = {
  secret: "Super secret secret", // Secret used to sign the session ID cookie
  cookie: {
    maxAge: 60 * 60 * 1000, // Session expires after one hour (in milliseconds)
    httpOnly: true, // Cookies accessible only through HTTP(S)
    secure: false, // Not using HTTPS in this example (change to true in production)
    sameSite: "strict", // Additional cookie security setting
  },
  resave: false, // Prevents session from being saved to store on every request
  saveUninitialized: true, // Saves a new session but not an unmodified one
  store: new SequelizeStore({
    db: sequelize, // Use Sequelize to store sessions in the database
  }),
};

app.use(session(sess)); // Apply session settings

// Configure Handlebars as the view engine
const hbs = exphbs.create({ helpers });
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware for handling JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Use the defined routes
app.use(routes);

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}`)
  );
});
