const SamlStrategy = require("passport-saml").Strategy;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

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
        const id = profile.nameID;
        const email =
          profile[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress" // seems like there should be a better way to do this
          ];

        const user = { id, email };
        console.log("logging in as", user);
        done(null, user);
      }
    )
  );
};
