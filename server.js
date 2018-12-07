const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

// Setup passport-saml
require("./passport")(passport);

const app = express();
const port = 3000;

/**
 * Configuration
 */
app.set("view engine", "ejs");

// The below is straight from https://github.com/gbraad/passport-saml-example
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "definitely change me"
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    return res.render("index", {
      user: req.user
    });
  }
  res.render("index", {
    user: null
  });
});

app.get(
  "/login",
  passport.authenticate("saml", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  })
);

// Redirect loop is occurring from this...
app.post(
  "/saml/consume",
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  function(req, res) {
    res.redirect("/");
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
