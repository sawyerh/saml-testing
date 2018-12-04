const SamlStrategy = require("passport-saml").Strategy;
const express = require("express");
const fs = require("fs");
const passport = require("passport");

const app = express();
const port = 3000;

/**
 * Configuration
 */
app.set("view engine", "ejs");

passport.use(
  new SamlStrategy(
    {
      url: "http://localhost:3000/saml/consume",
      entryPoint:
        "https://sawyernava.auth0.com/samlp/1mN88bXtntL2wXk0rLsaU7rvUy3krc7X",
      issuer: "passport-saml",
      cert:
        "MIIDAzCCAeugAwIBAgIJfbLTdsu4ccrSMA0GCSqGSIb3DQEBCwUAMB8xHTAbBgNVBAMTFHNhd3llcm5hdmEuYXV0aDAuY29tMB4XDTE4MTIwNDE2MzQ0MFoXDTMyMDgxMjE2MzQ0MFowHzEdMBsGA1UEAxMUc2F3eWVybmF2YS5hdXRoMC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDl8v66bffM4Vi75+yuu68NIyPvnV4yLh4AJdf5/qaDd94g8vnKLi5jyI7x5O95rkxKs8KZtnjcDedIE+geYQpkWmElgDmiM7C0DA0VZE5IFYtDhkgAtuAMUc3Lm8mWU8AnPkI6nEyBZ5Fi/1UHOgBtL6+movadZfzr4cKM+VLDz92lqgouDk68jx3wy3sylU8T2HoIzYFjqsBDMWbCEZJh2thJxu2spToJeBzoISp4YeP2oeegRJJnh4XQN12mcu09U3Gia/Fk4wrhQAJYKBW9xyB4Cn/1M7mJGmVldffRtQvJDcV0Xo1B8TRwqn9cK22qKmTuY/AYMsf3W++Tw6gXAgMBAAGjQjBAMA8GA1UdEwEB/wQFMAMBAf8wHQYDVR0OBBYEFNLJOcu6qcxiMl01XeU/m73+6KoIMA4GA1UdDwEB/wQEAwIChDANBgkqhkiG9w0BAQsFAAOCAQEAUAl616NNwOl3fEsIigpijNiwi5pbbiioUjVZDFaLfxO9IASYrOk3FzBtPmVwTpMqGME7S4eqAMGqHnbR7jFQB7hEwwjCAJGcRYQZgElVqerUpkmdUUen6AdQwuGF/+9xkXZ+ogDmvt/b19A0CgqGnt1DpO2igztchuRNplXMMxVTH3AQPsqPtCrUoWQmrcqFkBot5DopnWcX/TJy1Qy9dAQeeHh+xUkmqTTpg6SwudxddS+Wu5Ss1zX7d0IqNPUwzlZKSrMCm+RYa68X6ymJXUrb8U76ibqIJDdlGFz7iCQzefd+PzOarRem5nY2K9hTzPq1Nbcd0wp92enaqMl/NQ=="
    },
    function(profile, done) {
      findByEmail(profile.email, function(err, user) {
        if (err) {
          return done(err);
        }
        return done(null, user);
      });
    }
  )
);

/**
 * Routes
 */
app.get("/", (req, res) => res.render("index"));

app.get(
  "/login",
  passport.authenticate("saml", {
    successRedirect: "/",
    failureRedirect: "/",
    failureFlash: true
  })
);

app.post(
  "/saml/consume",
  passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
  function(req, res) {
    console.log("login callback");
    console.log(req.body);

    res.redirect("/");
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
