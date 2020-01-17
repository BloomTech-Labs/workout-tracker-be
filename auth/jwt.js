const passport = require("passport");
const Members = require("../members/members-model");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const opts = {};
const keys = require("../auth/keys");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = "process.env.JWT_SECRET";

// //opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// ff
passport.use(
  new JwtStrategy(opts, async function(payload, done) {
    Members.findBydId(payload.id)
      .then(function(user) {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err, false);
        }
      });
  })
);
